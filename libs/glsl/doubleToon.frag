uniform vec3 color;
uniform vec3 color2;

uniform vec3 uDirLightPos;
uniform float uDirLightPower;

uniform float uAmbientLightPower;

uniform sampler2D textureMask;

uniform bool secondEnabled;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vec4 mask = texture2D(textureMask, vUv);

  float sRGB = 0.4545;
  float light = clamp(dot(vNormal, uDirLightPos), 0.0, 1.0);

  vec3 meshColor;

  if (secondEnabled) {
    meshColor = mix(color, color2, pow(mask.r, 5.0));
  } else {
    meshColor = color;
  }

  gl_FragColor = vec4(meshColor, 1.0);
  gl_FragColor.rgb *= pow(uAmbientLightPower, 0.3);

  if (length(light) == 1.00) {
    gl_FragColor.rgb = meshColor * pow(uDirLightPower, sRGB);
  }

  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(sRGB));
}
