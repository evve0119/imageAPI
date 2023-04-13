<!--
File Path: packages/bricks-core/docs/brick/Camera.en-us.md
Category: BRICKSConfigSpec,Brick,Templates,BrickCamera,References
-->

# Camera

Camera view brick ([Tutorial](https://intercom.help/bricks-dag-inc/articles/5378589-camera))

## Properties - Auto Focus

- `Enabled`<!-- Original: autoFocusEnabled -->: Camera auto focus (bool)

## Properties - Face Detection

- `Enabled`<!-- Original: faceDetectionEnabled -->: Enable face detection (bool)
- `Event Mode`<!-- Original: faceDetectionEventMode -->: Face detection event mode (oneOf)
  - `when-detected`
  - `interval`

## Properties - Picture

- `Quality`<!-- Original: pictureQuality -->: Quality of take picture (number)
- `Base 64`<!-- Original: pictureBase64 -->: Take picture format as base64 (bool)
- `Is Mirror Image`<!-- Original: pictureIsMirrorImage -->: Mirror image of take picture (bool)

## Properties - Record

- `Quality`<!-- Original: recordQuality -->: Quality of record video (oneOf)
  - `4:3`
  - `288p`
  - `480p`
  - `720p`
  - `1080p`
  - `2160p`
- `Video Bitrate`<!-- Original: recordVideoBitrate -->: Bitrate of record video (bit/s) (number)
- `Mirror Video`<!-- Original: recordMirrorVideo -->: Mirror video of record video (bool)
- `Max Duration`<!-- Original: recordMaxDuration -->: Max duration of record video (s) (number)
- `Max File Size`<!-- Original: recordMaxFileSize -->: Max file size of record video (bytes) (number)

## Properties

- `Opacity`<!-- Original: opacity -->: The brick opacity (0 ~ 1) (number)
- `Background Color`<!-- Original: backgroundColor -->: The brick background color (string)
- `Focus Depth`<!-- Original: focusDepth -->: The auto focus feature of the camera to attempt to focus on the part of the image at this coordinate. (number)
- `Type`<!-- Original: type -->: Camera type (Ignore it if you are using external camera) (oneOf)
  - `back`
  - `front`
- `Zoom`<!-- Original: zoom -->: Camera zoom (number)
- `Flash Mode`<!-- Original: flashMode -->: Camera flash mode (oneOf)
  - `off`
  - `on`
  - `torch`
  - `auto`
- `Ratio`<!-- Original: ratio -->: Camera ratio (Unsupported ratio will be ignored) (string)
- `Capture Audio`<!-- Original: captureAudio -->: Capture audio when start recording (bool)
- `White Balance`<!-- Original: whiteBalance -->: Allows you to control the color temperature in your photos by cooling down or warming up the colors. (oneOf)
  - `auto`
  - `sunny`
  - `cloudy`
  - `shadow`
  - `incandescent`
  - `fluorescent`

## Events

- `BRICK_SHOW_START`: Event of brick start show
- `BRICK_STANDBY`: Trig if brick completed standby transition
- `BRICK_CAMERA_STATE_CHANGE`: Event of the Camera state change
- `BRICK_CAMERA_RECORD_START`: Event of the Camera record start
- `BRICK_CAMERA_RECORD_END`: Event of the Camera record end
- `BRICK_CAMERA_BARCODE_READ`: Event of the Camera barcode read
- `BRICK_CAMERA_PICTURE_TAKEN`: Event of the Camera picture taken
- `BRICK_CAMERA_RECORD_FINISH`: Event of the Camera record finished

## Actions

- `BRICK_CAMERA_TAKE_PICTURE`: Take picture on the Camera (Has defined properties)
- `BRICK_CAMERA_RECORD`: Record video on the Camera (Has defined properties)
- `BRICK_CAMERA_STOP_RECORD`: Record video on the Camera

## Outlets

- `BRICK_CAMERA_PICTURE_TAKEN` (object): Picture taken result
- `BRICK_CAMERA_RECORD_VIDEO` (object): Record video result
- `BRICK_CAMERA_BARCODE_READ` (object): Barcode read result
- `BRICK_CAMERA_FACE_DETECTED` (object): Faces detected result
