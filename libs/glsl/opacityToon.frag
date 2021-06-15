uniform vec3 color;
uniform float alpha;

uniform vec3 uDirLightPos;
uniform float uDirLightPower;

uniform float uAmbientLightPower;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  float sRGB = 0.4545;
  float light = clamp(dot(vNormal, uDirLightPos), 0.0, 1.0);

  vec3 meshColor = color;

  gl_FragColor = vec4(meshColor, alpha);
  gl_FragColor.rgb *= pow(uAmbientLightPower, 0.3);

  if (length(light) == 1.00) {
    gl_FragColor.rgb = meshColor * pow(uDirLightPower, sRGB);
  }

  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(sRGB));
}
