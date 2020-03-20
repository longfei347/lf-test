(function (window, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.eventUtil = factory();
    }
})(this, function () {
    // module ...
});


  windowKeys = [
    "MaterialButton",
    "MaterialCheckbox",
    "MaterialDataTable",
    "MaterialIconToggle",
    "MaterialLayout",
    "MaterialLayoutTab",
    "MaterialMenu",
    "MaterialProgress",
    "MaterialRadio",
    "MaterialRipple",
    "MaterialSlider",
    "MaterialSnackbar",
    "MaterialSpinner",
    "MaterialSwitch",
    "MaterialTabs",
    "MaterialTextfield",
    "MaterialTooltip",
    "alert",
    "applicationCache",
    "atob",
    "blur",
    "btoa",
    "caches",
    "cancelAnimationFrame",
    "cancelIdleCallback",
    "captureEvents",
    "chrome",
    "clearInterval",
    "clearTimeout",
    "clientInformation",
    "close",
    "closed",
    "componentHandler",
    "confirm",
    "console",
    "createImageBitmap",
    "crypto",
    "customElements",
    "defaultStatus",
    "defaultstatus",
    "devicePixelRatio",
    "document",
    "external",
    "fetch",
    "find",
    "focus",
    "frameElement",
    "frames",
    "getComputedStyle",
    "getMatchedCSSRules",
    "getSelection",
    "history",
    "indexedDB",
    "innerHeight",
    "innerWidth",
    "isSecureContext",
    "length",
    "localStorage",
    "location",
    "locationbar",
    "matchMedia",
    "menubar",
    "moveBy",
    "moveTo",
    "name",
    "navigator",
    "onabort",
    "onanimationend",
    "onanimationiteration",
    "onanimationstart",
    "onauxclick",
    "onbeforeunload",
    "onblur",
    "oncancel",
    "oncanplay",
    "oncanplaythrough",
    "onchange",
    "onclick",
    "onclose",
    "oncontextmenu",
    "oncuechange",
    "ondblclick",
    "ondevicemotion",
    "ondeviceorientation",
    "ondeviceorientationabsolute",
    "ondrag",
    "ondragend",
    "ondragenter",
    "ondragleave",
    "ondragover",
    "ondragstart",
    "ondrop",
    "ondurationchange",
    "onemptied",
    "onended",
    "onerror",
    "onfocus",
    "ongotpointercapture",
    "onhashchange",
    "oninput",
    "oninvalid",
    "onkeydown",
    "onkeypress",
    "onkeyup",
    "onlanguagechange",
    "onload",
    "onloadeddata",
    "onloadedmetadata",
    "onloadstart",
    "onlostpointercapture",
    "onmessage",
    "onmousedown",
    "onmouseenter",
    "onmouseleave",
    "onmousemove",
    "onmouseout",
    "onmouseover",
    "onmouseup",
    "onmousewheel",
    "onoffline",
    "ononline",
    "onpagehide",
    "onpageshow",
    "onpause",
    "onplay",
    "onplaying",
    "onpointercancel",
    "onpointerdown",
    "onpointerenter",
    "onpointerleave",
    "onpointermove",
    "onpointerout",
    "onpointerover",
    "onpointerup",
    "onpopstate",
    "onprogress",
    "onratechange",
    "onrejectionhandled",
    "onreset",
    "onresize",
    "onscroll",
    "onsearch",
    "onseeked",
    "onseeking",
    "onselect",
    "onshow",
    "onstalled",
    "onstorage",
    "onsubmit",
    "onsuspend",
    "ontimeupdate",
    "ontoggle",
    "ontransitionend",
    "onunhandledrejection",
    "onunload",
    "onvolumechange",
    "onwaiting",
    "onwebkitanimationend",
    "onwebkitanimationiteration",
    "onwebkitanimationstart",
    "onwebkittransitionend",
    "onwheel",
    "open",
    "openDatabase",
    "opener",
    "outerHeight",
    "outerWidth",
    "pageXOffset",
    "pageYOffset",
    "parent",
    "performance",
    "personalbar",
    "postMessage",
    "print",
    "prompt",
    "releaseEvents",
    "requestAnimationFrame",
    "requestIdleCallback",
    "resizeBy",
    "resizeTo",
    "screen",
    "screenLeft",
    "screenTop",
    "screenX",
    "screenY",
    "scroll",
    "scrollBy",
    "scrollTo",
    "scrollX",
    "scrollY",
    "scrollbars",
    "self",
    "sessionStorage",
    "setInterval",
    "setTimeout",
    "speechSynthesis",
    "status",
    "statusbar",
    "stop",
    "styleMedia",
    "toolbar",
    "top",
    "webkitCancelAnimationFrame",
    "webkitRequestAnimationFrame",
    "webkitRequestFileSystem",
    "webkitResolveLocalFileSystemURL",
    "webkitStorageInfo",
    "window"
  ];
  windowOwnKeys = [
    "$",
    "$$",
    "$_",
    "$0",
    "$1",
    "$2",
    "$3",
    "$4",
    "$x",
    "AbortController",
    "AbortSignal",
    "AbsoluteOrientationSensor",
    "Accelerometer",
    "alert",
    "AnalyserNode",
    "AnimationEvent",
    "applicationCache",
    "ApplicationCache",
    "ApplicationCacheErrorEvent",
    "Array",
    "ArrayBuffer",
    "atob",
    "Atomics",
    "Attr",
    "Audio",
    "AudioBuffer",
    "AudioBufferSourceNode",
    "AudioContext",
    "AudioDestinationNode",
    "AudioListener",
    "AudioNode",
    "AudioParam",
    "AudioParamMap",
    "AudioProcessingEvent",
    "AudioScheduledSourceNode",
    "AudioWorklet",
    "AudioWorkletNode",
    "AuthenticatorAssertionResponse",
    "AuthenticatorAttestationResponse",
    "AuthenticatorResponse",
    "BarProp",
    "BaseAudioContext",
    "BatteryManager",
    "BeforeInstallPromptEvent",
    "BeforeUnloadEvent",
    "BigInt",
    "BigInt64Array",
    "BigUint64Array",
    "BiquadFilterNode",
    "Blob",
    "BlobEvent",
    "Bluetooth",
    "BluetoothCharacteristicProperties",
    "BluetoothDevice",
    "BluetoothRemoteGATTCharacteristic",
    "BluetoothRemoteGATTDescriptor",
    "BluetoothRemoteGATTServer",
    "BluetoothRemoteGATTService",
    "BluetoothUUID",
    "blur",
    "Boolean",
    "BroadcastChannel",
    "btoa",
    "ByteLengthQueuingStrategy",
    "Cache",
    "caches",
    "CacheStorage",
    "cancelAnimationFrame",
    "cancelIdleCallback",
    "CanvasCaptureMediaStreamTrack",
    "CanvasGradient",
    "CanvasPattern",
    "CanvasRenderingContext2D",
    "captureEvents",
    "CDATASection",
    "ChannelMergerNode",
    "ChannelSplitterNode",
    "CharacterData",
    "chrome",
    "clear",
    "clearInterval",
    "clearTimeout",
    "clientInformation",
    "Clipboard",
    "ClipboardEvent",
    "close",
    "closed",
    "CloseEvent",
    "Comment",
    "CompositionEvent",
    "confirm",
    "console",
    "ConstantSourceNode",
    "ConvolverNode",
    "copy",
    "CountQueuingStrategy",
    "createImageBitmap",
    "Credential",
    "CredentialsContainer",
    "crypto",
    "Crypto",
    "CryptoKey",
    "CSS",
    "CSSConditionRule",
    "CSSFontFaceRule",
    "CSSGroupingRule",
    "CSSImageValue",
    "CSSImportRule",
    "CSSKeyframeRule",
    "CSSKeyframesRule",
    "CSSKeywordValue",
    "CSSMathInvert",
    "CSSMathMax",
    "CSSMathMin",
    "CSSMathNegate",
    "CSSMathProduct",
    "CSSMathSum",
    "CSSMathValue",
    "CSSMatrixComponent",
    "CSSMediaRule",
    "CSSNamespaceRule",
    "CSSNumericArray",
    "CSSNumericValue",
    "CSSPageRule",
    "CSSPerspective",
    "CSSPositionValue",
    "CSSRotate",
    "CSSRule",
    "CSSRuleList",
    "CSSScale",
    "CSSSkew",
    "CSSSkewX",
    "CSSSkewY",
    "CSSStyleDeclaration",
    "CSSStyleRule",
    "CSSStyleSheet",
    "CSSStyleValue",
    "CSSSupportsRule",
    "CSSTransformComponent",
    "CSSTransformValue",
    "CSSTranslate",
    "CSSUnitValue",
    "CSSUnparsedValue",
    "CSSVariableReferenceValue",
    "CustomElementRegistry",
    "customElements",
    "CustomEvent",
    "DataTransfer",
    "DataTransferItem",
    "DataTransferItemList",
    "DataView",
    "Date",
    "debug",
    "decodeURI",
    "decodeURIComponent",
    "defaultstatus",
    "defaultStatus",
    "DelayNode",
    "DeviceMotionEvent",
    "DeviceOrientationEvent",
    "devicePixelRatio",
    "dir",
    "dirxml",
    "document",
    "Document",
    "DocumentFragment",
    "DocumentType",
    "DOMError",
    "DOMException",
    "DOMImplementation",
    "DOMMatrix",
    "DOMMatrixReadOnly",
    "DOMParser",
    "DOMPoint",
    "DOMPointReadOnly",
    "DOMQuad",
    "DOMRect",
    "DOMRectList",
    "DOMRectReadOnly",
    "DOMStringList",
    "DOMStringMap",
    "DOMTokenList",
    "DragEvent",
    "DynamicsCompressorNode",
    "Element",
    "encodeURI",
    "encodeURIComponent",
    "EnterPictureInPictureEvent",
    "Error",
    "ErrorEvent",
    "escape",
    "eval",
    "EvalError",
    "event",
    "Event",
    "EventSource",
    "EventTarget",
    "external",
    "FederatedCredential",
    "fetch",
    "File",
    "FileList",
    "FileReader",
    "find",
    "Float32Array",
    "Float64Array",
    "focus",
    "FocusEvent",
    "FontFace",
    "FontFaceSetLoadEvent",
    "FormData",
    "frameElement",
    "frames",
    "Function",
    "GainNode",
    "Gamepad",
    "GamepadButton",
    "GamepadEvent",
    "GamepadHapticActuator",
    "getComputedStyle",
    "getEventListeners",
    "getSelection",
    "Gyroscope",
    "HashChangeEvent",
    "Headers",
    "history",
    "History",
    "HTMLAllCollection",
    "HTMLAnchorElement",
    "HTMLAreaElement",
    "HTMLAudioElement",
    "HTMLBaseElement",
    "HTMLBodyElement",
    "HTMLBRElement",
    "HTMLButtonElement",
    "HTMLCanvasElement",
    "HTMLCollection",
    "HTMLContentElement",
    "HTMLDataElement",
    "HTMLDataListElement",
    "HTMLDetailsElement",
    "HTMLDialogElement",
    "HTMLDirectoryElement",
    "HTMLDivElement",
    "HTMLDListElement",
    "HTMLDocument",
    "HTMLElement",
    "HTMLEmbedElement",
    "HTMLFieldSetElement",
    "HTMLFontElement",
    "HTMLFormControlsCollection",
    "HTMLFormElement",
    "HTMLFrameElement",
    "HTMLFrameSetElement",
    "HTMLHeadElement",
    "HTMLHeadingElement",
    "HTMLHRElement",
    "HTMLHtmlElement",
    "HTMLIFrameElement",
    "HTMLImageElement",
    "HTMLInputElement",
    "HTMLLabelElement",
    "HTMLLegendElement",
    "HTMLLIElement",
    "HTMLLinkElement",
    "HTMLMapElement",
    "HTMLMarqueeElement",
    "HTMLMediaElement",
    "HTMLMenuElement",
    "HTMLMetaElement",
    "HTMLMeterElement",
    "HTMLModElement",
    "HTMLObjectElement",
    "HTMLOListElement",
    "HTMLOptGroupElement",
    "HTMLOptionElement",
    "HTMLOptionsCollection",
    "HTMLOutputElement",
    "HTMLParagraphElement",
    "HTMLParamElement",
    "HTMLPictureElement",
    "HTMLPreElement",
    "HTMLProgressElement",
    "HTMLQuoteElement",
    "HTMLScriptElement",
    "HTMLSelectElement",
    "HTMLShadowElement",
    "HTMLSlotElement",
    "HTMLSourceElement",
    "HTMLSpanElement",
    "HTMLStyleElement",
    "HTMLTableCaptionElement",
    "HTMLTableCellElement",
    "HTMLTableColElement",
    "HTMLTableElement",
    "HTMLTableRowElement",
    "HTMLTableSectionElement",
    "HTMLTemplateElement",
    "HTMLTextAreaElement",
    "HTMLTimeElement",
    "HTMLTitleElement",
    "HTMLTrackElement",
    "HTMLUListElement",
    "HTMLUnknownElement",
    "HTMLVideoElement",
    "IDBCursor",
    "IDBCursorWithValue",
    "IDBDatabase",
    "IDBFactory",
    "IDBIndex",
    "IDBKeyRange",
    "IDBObjectStore",
    "IDBOpenDBRequest",
    "IDBRequest",
    "IDBTransaction",
    "IDBVersionChangeEvent",
    "IdleDeadline",
    "IIRFilterNode",
    "Image",
    "ImageBitmap",
    "ImageBitmapRenderingContext",
    "ImageCapture",
    "ImageData",
    "indexedDB",
    "Infinity",
    "innerHeight",
    "innerWidth",
    "InputDeviceCapabilities",
    "InputDeviceInfo",
    "InputEvent",
    "inspect",
    "Int16Array",
    "Int32Array",
    "Int8Array",
    "IntersectionObserver",
    "IntersectionObserverEntry",
    "Intl",
    "isFinite",
    "isNaN",
    "isSecureContext",
    "JSON",
    "Keyboard",
    "KeyboardEvent",
    "KeyboardLayoutMap",
    "keys",
    "length",
    "LinearAccelerationSensor",
    "localStorage",
    "location",
    "Location",
    "locationbar",
    "Lock",
    "LockManager",
    "Map",
    "matchMedia",
    "Math",
    "MediaCapabilities",
    "MediaCapabilitiesInfo",
    "MediaDeviceInfo",
    "MediaDevices",
    "MediaElementAudioSourceNode",
    "MediaEncryptedEvent",
    "MediaError",
    "MediaKeyMessageEvent",
    "MediaKeys",
    "MediaKeySession",
    "MediaKeyStatusMap",
    "MediaKeySystemAccess",
    "MediaList",
    "MediaQueryList",
    "MediaQueryListEvent",
    "MediaRecorder",
    "MediaSettingsRange",
    "MediaSource",
    "MediaStream",
    "MediaStreamAudioDestinationNode",
    "MediaStreamAudioSourceNode",
    "MediaStreamEvent",
    "MediaStreamTrack",
    "MediaStreamTrackEvent",
    "menubar",
    "MessageChannel",
    "MessageEvent",
    "MessagePort",
    "MIDIAccess",
    "MIDIConnectionEvent",
    "MIDIInput",
    "MIDIInputMap",
    "MIDIMessageEvent",
    "MIDIOutput",
    "MIDIOutputMap",
    "MIDIPort",
    "MimeType",
    "MimeTypeArray",
    "monitor",
    "monitorEvents",
    "MouseEvent",
    "moveBy",
    "moveTo",
    "MutationEvent",
    "MutationObserver",
    "MutationRecord",
    "name",
    "NamedNodeMap",
    "NaN",
    "NavigationPreloadManager",
    "navigator",
    "Navigator",
    "NetworkInformation",
    "Node",
    "NodeFilter",
    "NodeIterator",
    "NodeList",
    "Notification",
    "Number",
    "Object",
    "OfflineAudioCompletionEvent",
    "OfflineAudioContext",
    "offscreenBuffering",
    "OffscreenCanvas",
    "OffscreenCanvasRenderingContext2D",
    "onabort",
    "onafterprint",
    "onanimationend",
    "onanimationiteration",
    "onanimationstart",
    "onappinstalled",
    "onauxclick",
    "onbeforeinstallprompt",
    "onbeforeprint",
    "onbeforeunload",
    "onblur",
    "oncancel",
    "oncanplay",
    "oncanplaythrough",
    "onchange",
    "onclick",
    "onclose",
    "oncontextmenu",
    "oncuechange",
    "ondblclick",
    "ondevicemotion",
    "ondeviceorientation",
    "ondeviceorientationabsolute",
    "ondrag",
    "ondragend",
    "ondragenter",
    "ondragleave",
    "ondragover",
    "ondragstart",
    "ondrop",
    "ondurationchange",
    "onemptied",
    "onended",
    "onerror",
    "onfocus",
    "ongotpointercapture",
    "onhashchange",
    "oninput",
    "oninvalid",
    "onkeydown",
    "onkeypress",
    "onkeyup",
    "onlanguagechange",
    "onload",
    "onloadeddata",
    "onloadedmetadata",
    "onloadstart",
    "onlostpointercapture",
    "onmessage",
    "onmessageerror",
    "onmousedown",
    "onmouseenter",
    "onmouseleave",
    "onmousemove",
    "onmouseout",
    "onmouseover",
    "onmouseup",
    "onmousewheel",
    "onoffline",
    "ononline",
    "onpagehide",
    "onpageshow",
    "onpause",
    "onplay",
    "onplaying",
    "onpointercancel",
    "onpointerdown",
    "onpointerenter",
    "onpointerleave",
    "onpointermove",
    "onpointerout",
    "onpointerover",
    "onpointerup",
    "onpopstate",
    "onprogress",
    "onratechange",
    "onrejectionhandled",
    "onreset",
    "onresize",
    "onscroll",
    "onsearch",
    "onseeked",
    "onseeking",
    "onselect",
    "onstalled",
    "onstorage",
    "onsubmit",
    "onsuspend",
    "ontimeupdate",
    "ontoggle",
    "ontransitionend",
    "onunhandledrejection",
    "onunload",
    "onvolumechange",
    "onwaiting",
    "onwebkitanimationend",
    "onwebkitanimationiteration",
    "onwebkitanimationstart",
    "onwebkittransitionend",
    "onwheel",
    "open",
    "openDatabase",
    "opener",
    "Option",
    "OrientationSensor",
    "origin",
    "OscillatorNode",
    "outerHeight",
    "outerWidth",
    "OverconstrainedError",
    "PageTransitionEvent",
    "pageXOffset",
    "pageYOffset",
    "PannerNode",
    "parent",
    "parseFloat",
    "parseInt",
    "PasswordCredential",
    "Path2D",
    "PaymentAddress",
    "PaymentInstruments",
    "PaymentManager",
    "PaymentRequest",
    "PaymentRequestUpdateEvent",
    "PaymentResponse",
    "performance",
    "Performance",
    "PerformanceEntry",
    "PerformanceLongTaskTiming",
    "PerformanceMark",
    "PerformanceMeasure",
    "PerformanceNavigation",
    "PerformanceNavigationTiming",
    "PerformanceObserver",
    "PerformanceObserverEntryList",
    "PerformancePaintTiming",
    "PerformanceResourceTiming",
    "PerformanceServerTiming",
    "PerformanceTiming",
    "PeriodicWave",
    "Permissions",
    "PermissionStatus",
    "personalbar",
    "PhotoCapabilities",
    "PictureInPictureWindow",
    "Plugin",
    "PluginArray",
    "PointerEvent",
    "PopStateEvent",
    "postMessage",
    "Presentation",
    "PresentationAvailability",
    "PresentationConnection",
    "PresentationConnectionAvailableEvent",
    "PresentationConnectionCloseEvent",
    "PresentationConnectionList",
    "PresentationReceiver",
    "PresentationRequest",
    "print",
    "ProcessingInstruction",
    "profile",
    "profileEnd",
    "ProgressEvent",
    "Promise",
    "PromiseRejectionEvent",
    "prompt",
    "Proxy",
    "PublicKeyCredential",
    "PushManager",
    "PushSubscription",
    "PushSubscriptionOptions",
    "queryObjects",
    "RadioNodeList",
    "Range",
    "RangeError",
    "ReadableStream",
    "ReferenceError",
    "Reflect",
    "RegExp",
    "RelativeOrientationSensor",
    "releaseEvents",
    "RemotePlayback",
    "ReportingObserver",
    "Request",
    "requestAnimationFrame",
    "requestIdleCallback",
    "resizeBy",
    "ResizeObserver",
    "ResizeObserverEntry",
    "resizeTo",
    "Response",
    "RTCCertificate",
    "RTCDataChannel",
    "RTCDataChannelEvent",
    "RTCDTMFSender",
    "RTCDTMFToneChangeEvent",
    "RTCIceCandidate",
    "RTCPeerConnection",
    "RTCPeerConnectionIceEvent",
    "RTCRtpContributingSource",
    "RTCRtpReceiver",
    "RTCRtpSender",
    "RTCRtpTransceiver",
    "RTCSessionDescription",
    "RTCStatsReport",
    "RTCTrackEvent",
    "screen",
    "Screen",
    "screenLeft",
    "ScreenOrientation",
    "screenTop",
    "screenX",
    "screenY",
    "ScriptProcessorNode",
    "scroll",
    "scrollbars",
    "scrollBy",
    "scrollTo",
    "scrollX",
    "scrollY",
    "SecurityPolicyViolationEvent",
    "Selection",
    "self",
    "Sensor",
    "SensorErrorEvent",
    "ServiceWorker",
    "ServiceWorkerContainer",
    "ServiceWorkerRegistration",
    "sessionStorage",
    "Set",
    "setInterval",
    "setTimeout",
    "ShadowRoot",
    "SharedArrayBuffer",
    "SharedWorker",
    "SourceBuffer",
    "SourceBufferList",
    "speechSynthesis",
    "SpeechSynthesisEvent",
    "SpeechSynthesisUtterance",
    "StaticRange",
    "status",
    "statusbar",
    "StereoPannerNode",
    "stop",
    "Storage",
    "StorageEvent",
    "StorageManager",
    "String",
    "styleMedia",
    "StylePropertyMap",
    "StylePropertyMapReadOnly",
    "StyleSheet",
    "StyleSheetList",
    "SubtleCrypto",
    "SVGAElement",
    "SVGAngle",
    "SVGAnimatedAngle",
    "SVGAnimatedBoolean",
    "SVGAnimatedEnumeration",
    "SVGAnimatedInteger",
    "SVGAnimatedLength",
    "SVGAnimatedLengthList",
    "SVGAnimatedNumber",
    "SVGAnimatedNumberList",
    "SVGAnimatedPreserveAspectRatio",
    "SVGAnimatedRect",
    "SVGAnimatedString",
    "SVGAnimatedTransformList",
    "SVGAnimateElement",
    "SVGAnimateMotionElement",
    "SVGAnimateTransformElement",
    "SVGAnimationElement",
    "SVGCircleElement",
    "SVGClipPathElement",
    "SVGComponentTransferFunctionElement",
    "SVGDefsElement",
    "SVGDescElement",
    "SVGDiscardElement",
    "SVGElement",
    "SVGEllipseElement",
    "SVGFEBlendElement",
    "SVGFEColorMatrixElement",
    "SVGFEComponentTransferElement",
    "SVGFECompositeElement",
    "SVGFEConvolveMatrixElement",
    "SVGFEDiffuseLightingElement",
    "SVGFEDisplacementMapElement",
    "SVGFEDistantLightElement",
    "SVGFEDropShadowElement",
    "SVGFEFloodElement",
    "SVGFEFuncAElement",
    "SVGFEFuncBElement",
    "SVGFEFuncGElement",
    "SVGFEFuncRElement",
    "SVGFEGaussianBlurElement",
    "SVGFEImageElement",
    "SVGFEMergeElement",
    "SVGFEMergeNodeElement",
    "SVGFEMorphologyElement",
    "SVGFEOffsetElement",
    "SVGFEPointLightElement",
    "SVGFESpecularLightingElement",
    "SVGFESpotLightElement",
    "SVGFETileElement",
    "SVGFETurbulenceElement",
    "SVGFilterElement",
    "SVGForeignObjectElement",
    "SVGGElement",
    "SVGGeometryElement",
    "SVGGradientElement",
    "SVGGraphicsElement",
    "SVGImageElement",
    "SVGLength",
    "SVGLengthList",
    "SVGLinearGradientElement",
    "SVGLineElement",
    "SVGMarkerElement",
    "SVGMaskElement",
    "SVGMatrix",
    "SVGMetadataElement",
    "SVGMPathElement",
    "SVGNumber",
    "SVGNumberList",
    "SVGPathElement",
    "SVGPatternElement",
    "SVGPoint",
    "SVGPointList",
    "SVGPolygonElement",
    "SVGPolylineElement",
    "SVGPreserveAspectRatio",
    "SVGRadialGradientElement",
    "SVGRect",
    "SVGRectElement",
    "SVGScriptElement",
    "SVGSetElement",
    "SVGStopElement",
    "SVGStringList",
    "SVGStyleElement",
    "SVGSVGElement",
    "SVGSwitchElement",
    "SVGSymbolElement",
    "SVGTextContentElement",
    "SVGTextElement",
    "SVGTextPathElement",
    "SVGTextPositioningElement",
    "SVGTitleElement",
    "SVGTransform",
    "SVGTransformList",
    "SVGTSpanElement",
    "SVGUnitTypes",
    "SVGUseElement",
    "SVGViewElement",
    "Symbol",
    "SyncManager",
    "SyntaxError",
    "table",
    "TaskAttributionTiming",
    "Text",
    "TextDecoder",
    "TextEncoder",
    "TextEvent",
    "TextMetrics",
    "TextTrack",
    "TextTrackCue",
    "TextTrackCueList",
    "TextTrackList",
    "TimeRanges",
    "toolbar",
    "top",
    "Touch",
    "TouchEvent",
    "TouchList",
    "TrackEvent",
    "TransformStream",
    "TransitionEvent",
    "TreeWalker",
    "TypeError",
    "UIEvent",
    "Uint16Array",
    "Uint32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "undebug",
    "undefined",
    "unescape",
    "unmonitor",
    "unmonitorEvents",
    "URIError",
    "URL",
    "URLSearchParams",
    "USB",
    "USBAlternateInterface",
    "USBConfiguration",
    "USBConnectionEvent",
    "USBDevice",
    "USBEndpoint",
    "USBInterface",
    "USBInTransferResult",
    "USBIsochronousInTransferPacket",
    "USBIsochronousInTransferResult",
    "USBIsochronousOutTransferPacket",
    "USBIsochronousOutTransferResult",
    "USBOutTransferResult",
    "ValidityState",
    "values",
    "visualViewport",
    "VisualViewport",
    "VTTCue",
    "WaveShaperNode",
    "WeakMap",
    "WeakSet",
    "WebAssembly",
    "WebGL2RenderingContext",
    "WebGLActiveInfo",
    "WebGLBuffer",
    "WebGLContextEvent",
    "WebGLFramebuffer",
    "WebGLProgram",
    "WebGLQuery",
    "WebGLRenderbuffer",
    "WebGLRenderingContext",
    "WebGLSampler",
    "WebGLShader",
    "WebGLShaderPrecisionFormat",
    "WebGLSync",
    "WebGLTexture",
    "WebGLTransformFeedback",
    "WebGLUniformLocation",
    "WebGLVertexArrayObject",
    "WebKitAnimationEvent",
    "webkitCancelAnimationFrame",
    "WebKitCSSMatrix",
    "webkitMediaStream",
    "WebKitMutationObserver",
    "webkitRequestAnimationFrame",
    "webkitRequestFileSystem",
    "webkitResolveLocalFileSystemURL",
    "webkitRTCPeerConnection",
    "webkitSpeechGrammar",
    "webkitSpeechGrammarList",
    "webkitSpeechRecognition",
    "webkitSpeechRecognitionError",
    "webkitSpeechRecognitionEvent",
    "webkitStorageInfo",
    "WebKitTransitionEvent",
    "webkitURL",
    "WebSocket",
    "WheelEvent",
    "window",
    "Window",
    "Worker",
    "Worklet",
    "WritableStream",
    "XMLDocument",
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "XMLHttpRequestUpload",
    "XMLSerializer",
    "XPathEvaluator",
    "XPathExpression",
    "XPathResult",
    "XSLTProcessor"
  ]
