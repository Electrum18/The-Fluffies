uniform vec3 color;
uniform vec3 color2;

uniform sampler2D textureMask;

uniform bool secondEnabled;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vec4 mask = texture2D(textureMask, vUv);

  if (secondEnabled) {
    gl_FragColor = vec4(mix(color, color2, pow(mask.r, 5.0)), 1.0);
  } else {
    gl_FragColor = vec4(color, 1.0);
  }

  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.4545));
}
