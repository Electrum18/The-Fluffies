uniform vec4 color;
uniform vec4 color2;
uniform vec4 color3;
uniform vec4 color4;

uniform vec4 colorEnv;

uniform sampler2D textureMask;

uniform bool secondEnabled;
uniform bool thirdEnabled;
uniform bool fouthEnabled;

uniform vec3 uLightPos;
uniform vec3 uCameraDir;

uniform vec2 uPosition;
uniform float uScale;

varying vec2 vUv;
varying vec3 vNormal;

// All components are in the range [0…1], including hue.
vec3 hsv2rgb(vec3 c)
{
  vec4 K = vec4(1.0, 0.666, 0.333, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec4 mask = texture2D(textureMask, vUv * uScale - vec2(uScale * 0.5 - 0.5) + uPosition);

  if (fouthEnabled && mask.b > 0.5) {
    gl_FragColor = color4; // HSV
  } else if (thirdEnabled && mask.g > 0.5) {
    gl_FragColor = color3; // HSV
  } else if (secondEnabled && mask.r > 0.5) {
    gl_FragColor = color2; // HSV
  } else {
    gl_FragColor = color; // HSV
  }

  float light = clamp(dot(vNormal, uLightPos), 0.0, 1.0);
  float camera = clamp(1.0 + dot(uCameraDir, vNormal), 0.0, 1.0);

  float fresnel = pow(camera, 0.25);

  gl_FragColor.z = max(gl_FragColor.z, 0.1f);

  if (length(light) == 1.0) {
    gl_FragColor.y *= 0.8; // S

    if (fresnel > 0.9) {
      gl_FragColor.y *= 0.8; // S
      gl_FragColor.z *= 1.5; // V
    }
  } else {
    gl_FragColor.y *= 2.0; // S
    gl_FragColor.z *= 0.8; // V

    if (fresnel > 0.93) {
      gl_FragColor.y *= 1.5; // S
      gl_FragColor.z *= 0.9; // V
    }
  }

  gl_FragColor.rgb = pow(hsv2rgb(gl_FragColor.xyz), vec3(0.4545));
  gl_FragColor.rgb *= vec3(0.7) + colorEnv.z * 0.3;
}
