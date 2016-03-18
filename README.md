# RASPberry powered IPCamera to TV
## About
Pronounced: Ras - Pip - See - Tee - Vee

Goal: Display security cameras on a TV or dedicated Monitor; all managed remotely with a simple and modern WebUI.

> Under Very Heavy Development - NON FUNCTIONAL

raspIPC.tv is a fancy web interface for omxplayer, the Raspberry Pi command line video player.
Loaded up on a Raspberry Pi, a $35 credit card sized computer, It allows you to quickly and easily get your security cameras video feeds displayed on your Television with many great layouts that you can customize.

In CCTV lingo it is an IP-Feed to HDMI adapter with a nice browser interface.

### Online Demo:
* Availability limited, running off a real pi so please be nice: [demo.raspipc.tv](http://demo.raspipc.tv)

#### Features (95% Complete)
* RSTP/HTTP H264/MJPEG/MPEG2 (TCP) Video Streaming
* 1-10/13/16 Camera Grid Displays
* Multi-language Support
* Letterbox/Stretch/Fill Aspect Ratios
* WebUI for easy setup
  * Drag and drop arrangement
  * ONViF Detection
  * Preview Image
* Stream Watchdog
  * Restarts dropped streams
  * Durring outage, displays next highest priority
* Raspbian Jessie image - boot and go!

### Requirements:
* Camera feeds in a compatible encoding via RSTP or HTTP.
  * Note that MPEG2 Decoding requires the purchase of an external license.
  * Test your cameras by trying to play a stream in VideoLAN Client (VLC Player).
* Raspberry Pi2 or newer.
* MicroSD Memory Card - 8GB - 64GB.
* Wired Ethernet for best results, cams will drop out all the time on WiFi.
* TV/Monitor connected via HDMI.
  * FYI: Aspect Ratios will be identical to your display.
  * DVI Adapters work fine.
  * Displays can be powered on/off with a GPIO port.

### Suggestions:
* Monitors with wide viewing angles are best for dedicated displays.
* Avoid displays with glossy coatings, anti-glare is supreme for IPC.
* VESA Mounts for Raspberry Pi cases work great.
* Buy a high quality MicroSD Card, this wont need much space.

### Raspberry Pi Video
> The Raspberry Pi was chosen because it has excellent video performance for such a tiny and affordable little machine. It has hardware support for H264 MPEG4 MJPG MPEG2 video formats which covers basically all IP Cameras. (no h265 sorry)

### Screenshots
![screenshot](https://raw.githubusercontent.com/nayrnet/raspipc/master/screenshots/fourCams.png "4 Cameras")
![screenshot](https://raw.githubusercontent.com/nayrnet/raspipc/master/screenshots/fiveCamsCustom.png "5 Cameras Custom")
![screenshot](https://raw.githubusercontent.com/nayrnet/raspipc/master/screenshots/camConfig.png "Configure")
![screenshot](https://raw.githubusercontent.com/nayrnet/raspipc/master/screenshots/about.png "About Page")
