uniform vec3 color;
uniform vec3 color2;

uniform sampler2D textureMask;

varying vec2 vUv;

void main() {
  vec4 mask = texture2D(textureMask, vUv);

  gl_FragColor = vec4(mix(color, color2, pow(mask.r, 5.0)), 1.0);
  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.4545));
}
