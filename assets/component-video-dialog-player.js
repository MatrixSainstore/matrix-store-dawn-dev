/**
 * 弹窗视频播放器
 *
 * @example
 * <video-dialog-player
 *   data-cover-pc="https://cdn.shopify.com/s/files/1/0012/4957/4961/files/M908_video_cover.webp?v=1711529998"
 *   data-cover-mb="https://cdn.shopify.com/s/files/1/0012/4957/4961/files/M908_video_cover.webp?v=1711529998"
 *   data-video-source="dehwf8oH4_E"
 * ></video-dialog-player>
 */
if (!customElements.get("video-dialog-player")) {
  class VideoDialogPlayer extends HTMLElement {
    /**
     * PC 封面图
     * @type {String}
     */
    get coverPC() {
      return this.getAttribute("data-cover-pc");
    }
    /**
     * Mobile 封面图
     * @type {String}
     */
    get coverMB() {
      return this.getAttribute("data-cover-mb") ?? this.coverPC;
    }
    /**
     * @type {String}
     */
    get videoSource() {
      return this.getAttribute("data-video-source");
    }

    constructor() {
      super();
      const videoSourceLowerCase = this.videoSource.toLowerCase();
      // Video 挂载标签
      let tempVideoHTML = ``;
      if (
        videoSourceLowerCase.startsWith("http") &&
        !videoSourceLowerCase.includes("//youtu.be")
      ) {
        // 静态资源
        tempVideoHTML = `
          <video class="video-dialog-player__video">
            <source src="${this.videoSource}" type="video/mp4" />
          </video>
          `;
      } else {
        // Youtube
        tempVideoHTML = `<div class="video-dialog-player__video" data-plyr-provider="youtube" data-plyr-embed-id="${this.videoSource}"></div>`;
      }
      this.innerHTML = `
            <div class="video-dialog-player__container video-img-container">
              <img
                class="video-dialog-player__cover-pc"
                src="${this.coverPC}"
                alt=""
              >
              <img
                class="video-dialog-player__cover-mb"
                src="${this.coverMB}"
                alt=""
              >
              <div class="video-dialog-player__play-button">
                <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M56 8C46.5065 8 37.2262 10.8152 29.3326 16.0895C21.4391 21.3638 15.2868 28.8603 11.6538 37.6312C8.0208 46.402 7.07024 56.0532 8.92233 65.3643C10.7744 74.6754 15.346 83.2282 22.0589 89.9411C28.7718 96.654 37.3246 101.226 46.6357 103.078C55.9468 104.93 65.598 103.979 74.3688 100.346C83.1397 96.7132 90.6362 90.5609 95.9105 82.6674C101.185 74.7738 104 65.4935 104 56C104 49.6965 102.758 43.4548 100.346 37.6312C97.934 31.8076 94.3983 26.5161 89.9411 22.0589C85.4839 17.6017 80.1924 14.066 74.3688 11.6538C68.5452 9.24156 62.3035 8 56 8ZM46.4 77.6V34.4L75.2 56L46.4 77.6Z" fill="white" fill-opacity="0.87"/>
                </svg>
              </div>
            </div>
            <div class="video-dialog-player__dialog-wrapper">
              <div class="video-dialog-player__overlay"></div>
              <div class="video-dialog-player__dialog">
                <div class="video-dialog-player__close-button">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.9">
                    <path d="M22.4 43.488L32 33.888L41.6 43.488L43.488 41.6L33.888 32L43.488 22.4L41.6 20.512L32 30.112L22.4 20.512L20.512 22.4L30.112 32L20.512 41.6L22.4 43.488ZM32.008 56C28.6907 56 25.5707 55.3707 22.648 54.112C19.7271 52.8516 17.1858 51.1413 15.024 48.9813C12.8622 46.8231 11.1511 44.2844 9.89067 41.3653C8.63022 38.4462 8 35.3271 8 32.008C8 28.6907 8.62933 25.5707 9.888 22.648C11.1484 19.7271 12.8587 17.1858 15.0187 15.024C17.1769 12.8622 19.7156 11.1511 22.6347 9.89067C25.5538 8.63022 28.6729 8 31.992 8C35.3093 8 38.4293 8.62933 41.352 9.888C44.2729 11.1484 46.8142 12.8587 48.976 15.0187C51.1378 17.1769 52.8489 19.7156 54.1093 22.6347C55.3698 25.5538 56 28.6729 56 31.992C56 35.3093 55.3707 38.4293 54.112 41.352C52.8516 44.2729 51.1413 46.8142 48.9813 48.976C46.8231 51.1378 44.2844 52.8489 41.3653 54.1093C38.4462 55.3698 35.3271 56 32.008 56ZM32 53.3333C37.9556 53.3333 43 51.2667 47.1333 47.1333C51.2667 43 53.3333 37.9556 53.3333 32C53.3333 26.0444 51.2667 21 47.1333 16.8667C43 12.7333 37.9556 10.6667 32 10.6667C26.0444 10.6667 21 12.7333 16.8667 16.8667C12.7333 21 10.6667 26.0444 10.6667 32C10.6667 37.9556 12.7333 43 16.8667 47.1333C21 51.2667 26.0444 53.3333 32 53.3333Z" fill="white" fill-opacity="0.87"/>
                    </g>
                  </svg>
                </div>
                <div class="video-dialog-player__video-wrapper">
                  ${tempVideoHTML}
                </div>
              </div>
            </div>
          `;
      this.selecters = {
        playButton: ".video-dialog-player__play-button",
        dialogWrapper: ".video-dialog-player__dialog-wrapper",
        closeButton: ".video-dialog-player__close-button",
        videoWrapper: ".video-dialog-player__video-wrapper",
        video: ".video-dialog-player__video",
      };
      this.elements = {
        playButton: this.querySelector(this.selecters.playButton),
        dialogWrapper: this.querySelector(this.selecters.dialogWrapper),
        closeButton: this.querySelector(this.selecters.closeButton),
        video: this.querySelector(this.selecters.video),
      };
      this.initListener();
    }

    initListener() {
      this.elements.playButton.addEventListener("click", () => {
        this.openDialog();
      });
      this.elements.closeButton.addEventListener("click", () => {
        this.closeDialog();
      });
    }

    openDialog() {
      this.classList.add("dialog--open");
      if (!this.myPlayer) {
        this.initPlayer();
      } else {
        this.myPlayer.play();
      }
    }

    closeDialog() {
      this.classList.remove("dialog--open");
      this.myPlayer.stop();
    }

    initPlayer() {
      this.myPlayer = new Plyr(this.elements.video, {
        autoplay: true,
        resetOnEnd: true,
        loop: {
          active: true,
        },
        controls: [
          "play-large", // The large play button in the center
          "restart", // Restart playback
          "rewind", // Rewind by the seek time (default 10 seconds)
          "play", // Play/pause playback
          "fast-forward", // Fast forward by the seek time (default 10 seconds)
          "progress", // The progress bar and scrubber for playback and buffering
          "current-time", // The current time of playback
          "duration", // The full duration of the media
          "mute", // Toggle mute
          "volume", // Volume control
          "captions", // Toggle captions
          "settings", // Settings menu
          "pip", // Picture-in-picture (currently Safari only)
          "airplay", // Airplay (currently Safari only)
          "download", // Show a download button with a link to either the current source or a custom URL you specify in your options
          "fullscreen", // Toggle fullscreen
        ],
        tooltips: {
          controls: false,
          seek: false,
        },
        youtube: {
          loop: 1,
        },
        muted: false,
        //ratio: '16:9',
        quality: {
          default: 1080,
          options: [4320, 2880, 2160, 1440, 1080, 720],
        },
      });

      this.myPlayer.on("ready", () => {
        this.myPlayer.play();
      });
    }
  }

  customElements.define("video-dialog-player", VideoDialogPlayer);
}
