uniform vec3 color;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;

uniform float alpha;
uniform float alpha2;
uniform float alpha3;
uniform float alpha4;

uniform sampler2D textureMask;

uniform bool secondEnabled;
uniform bool thirdEnabled;
uniform bool fouthEnabled;

uniform vec3 uDirLightPos;
uniform float uDirLightPower;
uniform float uAmbientLightPower;

uniform vec2 uPosition;
uniform float uScale;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vec4 mask = texture2D(textureMask, vUv * uScale - vec2(uScale * 0.5 - 0.5) + uPosition);

  if (fouthEnabled && mask.b > 0.5) {
    gl_FragColor = vec4(color4, alpha4);
  } else if (thirdEnabled && mask.g > 0.5) {
    gl_FragColor = vec4(color3, alpha3);
  } else if (secondEnabled && mask.r > 0.5) {
    gl_FragColor = vec4(color2, alpha2);
  } else {
    gl_FragColor = vec4(color, alpha);
  }

  float light = clamp(dot(vNormal, uDirLightPos), 0.0, 1.0);

  if (length(light) == 1.00) {
    gl_FragColor.rgb *= uDirLightPower;
  } else {
    gl_FragColor.rgb *= uAmbientLightPower;
  }

  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.45));
}
