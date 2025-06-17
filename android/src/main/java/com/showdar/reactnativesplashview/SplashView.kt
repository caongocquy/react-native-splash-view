package com.showdar.reactnativesplashview

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.app.Activity
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.ImageView
import com.airbnb.lottie.LottieAnimationView

object SplashView {
  private const val TAG = "SplashContainer"
  private var isShowing = false

  fun show(activity: Activity) {
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

      val background = ImageView(activity).apply {
        setImageResource(R.drawable.splash_screen)
        layoutParams = FrameLayout.LayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT,
          ViewGroup.LayoutParams.MATCH_PARENT
        )
        scaleType = ImageView.ScaleType.FIT_XY
      }

      val lottieView = LottieAnimationView(activity).apply {
        setAnimation("splash_lottie.json")
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

      container.addView(background)
      container.addView(lottieView)

      (activity.window.decorView as? ViewGroup)?.addView(container)

      SplashEventBridge.setContext(activity)
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
