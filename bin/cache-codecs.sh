#!/bin/bash
# RasPipC - Codec Support
## We cant scan for codecs once the video streams are going, so we do this on every boot before the streams have started.

FILE='/tmp/codec-support.json'
rm $FILE
for codec in H264 MPG2 WVC1 MPG4 MJPG WMV9; do
	LINE=`echo -e "$(vcgencmd codec_enabled $codec)"|sed 's/=/":"/g'`
	echo $LINE >> $FILE
done
sed -i -e '1i {' -e 's/./    "&/; s/$/",/; $s/,$//; $a }' $FILE
