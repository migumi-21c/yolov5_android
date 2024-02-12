package com.example.androidseries

import android.content.Context
import android.content.res.AssetManager
import android.os.Bundle
import android.view.SurfaceView
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.opencv.android.BaseLoaderCallback
import org.opencv.android.CameraBridgeViewBase
import org.opencv.android.OpenCVLoader
import org.opencv.core.*
import org.opencv.dnn.Dnn
import org.opencv.dnn.Net
import org.opencv.imgproc.Imgproc
import org.opencv.utils.Converters
import java.io.BufferedInputStream
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class MainActivity : AppCompatActivity(), CameraBridgeViewBase.CvCameraViewListener2 {

    private lateinit var cameraBridgeViewBase: CameraBridgeViewBase
    private lateinit var baseLoaderCallback: BaseLoaderCallback
    private var startYolo = false
    private var firstTimeYolo = false
    private lateinit var tinyYolo: Net

    override fun getMainComponentName(): String = "project"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    private fun getPath(file: String, context: Context): String {
        val assetManager: AssetManager = context.assets
        var inputStream: BufferedInputStream? = null
        try {
            inputStream = BufferedInputStream(assetManager.open(file))
            val data = ByteArray(inputStream.available())
            inputStream.read(data)
            inputStream.close()
            val outFile = File(context.filesDir, file)
            val os = FileOutputStream(outFile)
            os.write(data)
            os.close()
            return outFile.absolutePath
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return ""
    }

    fun YOLO(view: View) {
        startYolo = !startYolo
        if (startYolo && !firstTimeYolo) {
            firstTimeYolo = true
            val tinyYoloCfg = getPath("yolov5s.yaml", this)
            val tinyYoloWeights = getPath("best.pt", this)
            tinyYolo = Dnn.readNetFromDarknet(tinyYoloCfg, tinyYoloWeights)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        cameraBridgeViewBase = findViewById(R.id.CameraView) as CameraBridgeViewBase
        cameraBridgeViewBase.visibility = SurfaceView.VISIBLE
        cameraBridgeViewBase.setCvCameraViewListener(this)

        baseLoaderCallback = object : BaseLoaderCallback(this) {
            override fun onManagerConnected(status: Int) {
                super.onManagerConnected(status)
                when (status) {
                    BaseLoaderCallback.SUCCESS -> cameraBridgeViewBase.enableView()
                    else -> super.onManagerConnected(status)
                }
            }
        }
    }

    override fun onCameraViewStarted(width: Int, height: Int) {
        if (startYolo) {
            val tinyYoloCfg = getPath("yolov5s.yaml", this)
            val tinyYoloWeights = getPath("best.pt", this)
            tinyYolo = Dnn.readNetFromDarknet(tinyYoloCfg, tinyYoloWeights)
        }
    }

    override fun onCameraViewStopped() {}

    override fun onCameraFrame(inputFrame: CameraBridgeViewBase.CvCameraViewFrame): Mat {
        val frame = inputFrame.rgba()

        if (startYolo) {
            Imgproc.cvtColor(frame, frame, Imgproc.COLOR_RGBA2RGB)

            val imageBlob = Dnn.blobFromImage(frame, 0.00392, Size(416.0, 416.0), Scalar(0.0, 0.0, 0.0), false, false)
            tinyYolo.setInput(imageBlob)

            val result = mutableListOf<Mat>()
            val outBlobNames = listOf("yolo_16", "yolo_23")
            tinyYolo.forward(result, outBlobNames)

            val confThreshold = 0.3f
            val clsIds = mutableListOf<Int>()
            val confs = mutableListOf<Float>()
            val rects = mutableListOf<Rect>()

            for (i in result.indices) {
                val level = result[i]

                for (j in 0 until level.rows()) {
                    val row = level.row(j)
                    val scores = row.colRange(5, level.cols())

                    val mm = Core.minMaxLoc(scores)
                    val confidence = mm.maxVal.toFloat()
                    val classIdPoint = mm.maxLoc

                    if (confidence > confThreshold) {
                        val centerX = (row[0, 0][0] * frame.cols()).toInt()
                        val centerY = (row[0, 1][0] * frame.rows()).toInt()
                        val width = (row[0, 2][0] * frame.cols()).toInt()
                        val height = (row[0, 3][0] * frame.rows()).toInt()

                        val left = centerX - width / 2
                        val top = centerY - height / 2

                        clsIds.add(classIdPoint.x.toInt())
                        confs.add(confidence)
                        rects.add(Rect(left, top, width, height))
                    }
                }
            }

            val ArrayLength = confs.size

            if (ArrayLength >= 1) {
                val nmsThresh = 0.2f
                val confidences = MatOfFloat(*confs.toFloatArray())
                val boxesArray = rects.toTypedArray()
                val boxes = MatOfRect(*boxesArray)
                val indices = MatOfInt()

                Dnn.NMSBoxes(boxes, confidences, confThreshold, nmsThresh, indices)

                val ind = indices.toArray()
                for (i in ind.indices) {
                    val idx = ind[i]
                    val box = boxesArray[idx]

                    val idGuy = clsIds[idx]
                    val conf = confs[idx]

                    val cocoNames = listOf("sign")
                    val intConf = (conf * 100).toInt()

                    Imgproc.putText(frame, "${cocoNames[idGuy]} $intConf%", box.tl(), Core.FONT_HERSHEY_SIMPLEX, 2.0, Scalar(255.0, 255.0, 0.0), 2)
                    Imgproc.rectangle(frame, box.tl(), box.br(), Scalar(255.0, 0.0, 0.0), 2)
                }
            }
        }

        return frame
    }

    override fun onResume() {
        super.onResume()
        if (!OpenCVLoader.initDebug()) {
            Toast.makeText(applicationContext, "There's a problem, yo!", Toast.LENGTH_SHORT).show()
        } else {
            baseLoaderCallback.onManagerConnected(BaseLoaderCallback.SUCCESS)
        }
    }

    override fun onPause() {
        super.onPause()
        if (cameraBridgeViewBase != null) {
            cameraBridgeViewBase.disableView()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        if (cameraBridgeViewBase != null) {
            cameraBridgeViewBase.disableView()
        }
    }
}
