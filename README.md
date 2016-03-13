# RASpberry PI IPCamera Display
## About
Pronounced: Ras - Pip - See

Goals:
 * Easily display security cameras on a dedicated monitor managed via simple and modern WebUI.
 * Use excess resources to provide secure remote access to security cameras via OpenVPN.
   * Port Forwarding to IPCameras is EVIL, to make it even easier it this will encourage its use.

> Under Very Heavy Development - NON FUNCTIONAL

#### Features (mostly planned, not all implemented)
* RSTP H264 & MJPEG TCP Video Streaming
* 1/4/5/6/7/8/9/10/13/16 Grid Displays
* WebUI for easy setup
  * Drag and drop arrangement
  * ONViF Detection
  * Real image in mockup
* Stream Watchdog
  * Restarts dropped streams
  * Durring outage, displays next highest priority
* External IO for monitor
* Home Automation Integration
  * MQTT API
  * RESTful URL API
* Raspbian Jessie image - boot and go!
  * OpenVPN Server ready for Secure access to IPCameras
  * Nginx Proxy for external auth support
  * ONViF Discovery on first boot

## Screenshots
=================
![screenshot](screenshots/Screen Shot 2016-03-12 at 9.40.32 PM.png "Screenshot")
![screenshot](screenshots/Screen Shot 2016-03-13 at 12.38.49 AM.png "Screenshot")
