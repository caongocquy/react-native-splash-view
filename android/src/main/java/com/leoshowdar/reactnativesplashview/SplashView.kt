package com.leoshowdar.reactnativesplashview


import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.app.Activity
import android.util.Log
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.ImageView
import com.airbnb.lottie.LottieAnimationView

object SplashView {
  private const val TAG = "SplashContainer"
  private var isShowing = false

  fun show(activity: Activity, imageName: String?, lottieName: String?) {
    if (imageName.isNullOrEmpty() && lottieName.isNullOrEmpty()) {
      Log.w("SplashView", "⚠️ You should provide at least imageName or lottieName")
    }

    if (isShowing) return

    activity.runOnUiThread {
      isShowing = true

      val container = FrameLayout(activity).apply {
        layoutParams = FrameLayout.LayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT,
          ViewGroup.LayoutParams.MATCH_PARENT
        )
        tag = TAG
      }

      // Add background image if provided
      if (!imageName.isNullOrEmpty()) {
        val resId = activity.resources.getIdentifier(imageName, "drawable", activity.packageName)
        if (resId != 0) {
          val background = ImageView(activity).apply {
            setImageResource(resId)
            layoutParams = FrameLayout.LayoutParams(
              ViewGroup.LayoutParams.MATCH_PARENT,
              ViewGroup.LayoutParams.MATCH_PARENT
            )
            scaleType = ImageView.ScaleType.FIT_XY
          }
          container.addView(background)
        }
      }

      // Add Lottie animation if provided
      if (!lottieName.isNullOrEmpty()) {
        val lottieView = LottieAnimationView(activity).apply {
          setAnimation("$lottieName.json")
          repeatCount = 0
          layoutParams = FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
          )
          scaleType = ImageView.ScaleType.CENTER_CROP
          addAnimatorListener(object : AnimatorListenerAdapter() {
            override fun onAnimationEnd(animation: Animator) {
              SplashEventBridge.sendEvent("onLottieAnimationFinished", null)
            }
          })
          playAnimation()
        }
        container.addView(lottieView)
      }

      (activity.window.decorView as? ViewGroup)?.addView(container)
    }
  }

  fun hide(activity: Activity) {
    activity.runOnUiThread {
      val decor = activity.window.decorView as? ViewGroup ?: return@runOnUiThread
      decor.findViewWithTag<FrameLayout>(TAG)?.let {
        decor.removeView(it)
        isShowing = false
      }
    }
  }
}
