## About
![Raspberry Pi](https://img.shields.io/badge/raspberry-pi-red.svg)
[![GitHub release](https://img.shields.io/github/release/qubyte/rubidium.svg)]()
[![GPL-3.0](https://img.shields.io/badge/license-GPL-blue.svg)]()
[![npm](https://img.shields.io/npm/v/npm.svg)]()
[![node](https://img.shields.io/node/v/gh-badges.svg)]()

Pronounced: Ras - Pip - See - Tee - Vee

Goal: Display network security cameras on a TV or dedicated display; all managed remotely with a simple and modern WebUI.

> Under Very Heavy Development - NON FUNCTIONAL

[raspIPC.tv](http://raspIPC.tv) is a fancy web front end for [omxplayer](https://github.com/popcornmix/omxplayer), the Raspberry Pi command line video player.
Loaded up on a Raspberry Pi, a $35 credit card sized computer, It allows you to quickly and easily get your security
cameras video feeds displayed on your Television with many great layouts that you can customize.

In CCTV lingo it is an Network Camera to HDMI adapter with a modern browser interface.
With ready to go SD card images (think firmware) you don't need to be a linux expert, it is setup so you will not need
to use the command line just like your linux powered security cameras.

![Raspberry Pi3](https://raw.githubusercontent.com/nayrnet/raspipc/master/public/images/rpi3-board.png)

Should you be inclined to dig into the [Raspbian OS](https://www.raspbian.org) you'll find that there are plenty of avilable resources left for doing
other tasks, such as running a local VPN Server. You can find guides online for getting them going and once running you
can securely access your cameras remotely without exposing them to the dangers of the internet.

### Online Demo:
* Availability limited, running off a real pi so please be nice: [demo.raspipc.tv](http://demo.raspipc.tv)

#### Features (95% Complete)
* RSTP/HTTP H264/MJPEG/MPEG2 (TCP) Video Streaming
* 1-10/13/16 Camera Grid Displays
* Multi-language Support detected by browser
  * English (Default)
  * German
  * Please help translate: [language file](https://github.com/nayrnet/raspipc/blob/master/public/language/locale-en.json)
* Letterbox/Stretch/Fill Aspect Ratios
* WebUI for easy setup
  * Drag and drop arrangement
  * Onvif Stream Detection
  * Preview Image
  * HTTP API for NVR/Automation Integration
* Stream Watchdog
  * Restarts dropped streams automatically
  * Durring outage, replaces down camera with next highest camera that is not displayed.
* Raspbian Jessie image - boot and go!

### Requirements:
* Camera feeds in a compatible encoding via RSTP or HTTP.
  * Note that MPEG2 Decoding requires the purchase of an external license.
  * Test your cameras by trying to play a stream in [VideoLAN Client](http://www.videolan.org/).
* Raspberry Pi2 or newer.
* MicroSD Memory Card - 8GB - 64GB.
* SD Card Writer for installing.
* Wired Ethernet for best results, cams will drop out all the time on WiFi.
* TV/Monitor connected via HDMI.
  * FYI: Aspect Ratios will be identical to your display.
  * DVI Adapters work fine.
  * Displays can be powered on/off with a GPIO port and a relay.

### Suggestions:
* Monitors with wide viewing angles are best for dedicated displays.
* Avoid displays with glossy coatings, anti-glare is supreme for IPC.
* VESA Mounts for Raspberry Pi cases work great.
* Buy a high quality MicroSD Card, this wont need much space.

### Raspberry Pi Video
> The Raspberry Pi was chosen because it has excellent video performance for such a tiny and affordable little machine. It has hardware support for H264 MPEG4 MJPG MPEG2 video formats which covers basically all IP Cameras. (no h265 sorry, lets hope Raspberry Pi 4k is next!)

### Screenshots
![screenshot](https://raw.githubusercontent.com/nayrnet/raspipc/master/screenshots/fourCams.png "4 Cameras")
![screenshot](https://raw.githubusercontent.com/nayrnet/raspipc/master/screenshots/fiveCamsCustom.png "5 Cameras Custom")
![screenshot](https://raw.githubusercontent.com/nayrnet/raspipc/master/screenshots/camConfig.png "Configure")
![screenshot](https://raw.githubusercontent.com/nayrnet/raspipc/master/screenshots/about.png "About Page")

### Feature Wish list:
This is a todo list of awesome ideas I would like to get around to but haven't got around to implementing yet.
* RSTP Streams via VLC Plugin
* Custom Display Drawing
* Cropping/Zooming
* Change cameras on timers
* IR Remote Control support
* MQTT API
* Auto Detection and Display on first boot
* Mobile Interface
* Simple OpenVPN WebUI

#### Donate
If you found this extremely useful and would like to donate to the cause I always have a need for more hardware to test and experiment with.
http://amzn.com/w/2WIL3AMJWRMWT
