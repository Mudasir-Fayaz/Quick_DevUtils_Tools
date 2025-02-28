import { 
  QrCodeGenerator,
  WifiQrCodeGenerator,
  SvgPlaceholderGenerator,
  CameraRecorder
} from "@/components/tools/camera";

import { ToolCategory } from "@/types";

const cameraTools: ToolCategory = {
  name: "Camera & QR Tools",
  icon: "Camera",
  tools: [
    {
      name: "QR Code Generator",
      icon: 'QrCode',
      description: "Generate customizable QR codes for any text or URL. Choose colors, sizes, and styles to match your branding needs. Perfect for sharing links, contact info, or promotional materials. Ensures compatibility with most QR scanners. Export as high-resolution images for professional use.",
      keywords: "qr code, generator, scanner, encode",
      slug: "/tool/qr-generator",
      component: QrCodeGenerator,
      faqs: [
        { question: "Can I customize the color of the QR code?", answer: "Yes, the tool allows you to choose custom colors for your QR code." },
        { question: "What formats can I export the QR code in?", answer: "You can export QR codes as PNG or SVG files." },
        { question: "Are the QR codes generated compatible with all scanners?", answer: "Yes, the generated QR codes are compatible with most modern scanners." },
        { question: "Can I add a logo to the QR code?", answer: "Currently, the tool does not support adding logos directly to QR codes." },
        { question: "Is there a size limit for the data encoded in the QR code?", answer: "Yes, QR codes have a maximum data capacity of approximately 3KB." }
      ]
    },
    {
      name: "WiFi QR Code Generator",
      icon: 'Wifi',
      description: "Create QR codes to simplify WiFi connections for guests and users. Input network name, password, and security type to generate a QR code. Perfect for businesses or events where you want easy network access. Scanning the QR code connects devices automatically to your network. Export as an image for printing or sharing.",
      keywords: "wifi, qr code, network, connection",
      slug: "/tool/wifi-qr",
      component: WifiQrCodeGenerator,
      faqs: [
        { question: "What information do I need to create a WiFi QR code?", answer: "You need the network name (SSID), password, and security type (e.g., WPA, WEP)." },
        { question: "Can I generate a QR code for an open WiFi network?", answer: "Yes, you can generate a QR code for networks without passwords by selecting 'Open' as the security type." },
        { question: "Are the QR codes secure?", answer: "The QR codes include the password but cannot encrypt it. Share the QR code cautiously." },
        { question: "Can these QR codes connect to 5GHz networks?", answer: "Yes, the QR codes work for both 2.4GHz and 5GHz networks." },
        { question: "Do devices need a specific app to scan the QR code?", answer: "Most modern devices can scan WiFi QR codes without additional apps." }
      ]
    },
    {
      name: "SVG Placeholder Generator",
      icon: 'Image',
      description: "Generate lightweight SVG placeholder images with customizable dimensions and colors. Ideal for use during web development to represent content that will be replaced later. Supports adding text, shapes, and background colors. Efficient and scalable for high-performance websites. Export as SVG files for seamless integration into your project.",
      keywords: "svg, placeholder, image, generator",
      slug: "/tool/svg-placeholder",
      component: SvgPlaceholderGenerator,
      faqs: [
        { question: "What customization options are available?", answer: "You can adjust dimensions, background colors, and add text or shapes." },
        { question: "Is the SVG scalable?", answer: "Yes, SVGs are vector-based and scale without losing quality." },
        { question: "Can I use these placeholders in HTML directly?", answer: "Yes, you can embed the SVG code directly in your HTML or use it as a file reference." },
        { question: "Are the generated SVGs responsive?", answer: "Yes, the SVGs adapt well to different screen sizes and resolutions." },
        { question: "Can I add custom fonts to the SVG placeholders?", answer: "Currently, the tool supports basic font styles, but custom fonts may need manual editing." }
      ]
    },
    {
      name: "Camera Recorder",
      icon: 'Video',
      description: "Record videos and take snapshots directly from your device's camera. Supports high-resolution recording with multiple format options. Great for creating quick recordings, tutorials, or capturing moments on the go. Offers easy controls for pausing, resuming, and saving recordings. Compatible with most modern browsers and devices.",
      keywords: "camera, recorder, video, snapshot",
      slug: "/tool/camera-recorder",
      component: CameraRecorder,
      faqs: [
        { question: "What formats are supported for video recordings?", answer: "The tool supports formats like MP4 and WebM for video recordings." },
        { question: "Can I record audio along with video?", answer: "Yes, audio recording is supported if your device has a microphone." },
        { question: "Is there a maximum duration for recordings?", answer: "The duration depends on your device's storage and browser limitations." },
        { question: "Can I take snapshots during video recording?", answer: "Yes, you can take snapshots while recording a video." },
        { question: "Do I need any plugins or extensions?", answer: "No, the tool works directly in most modern browsers without additional plugins." }
      ]
    }
  ]
  
};

export default cameraTools;