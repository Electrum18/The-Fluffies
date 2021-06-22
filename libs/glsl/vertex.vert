attribute vec3 morphTarget0;
attribute vec3 morphTarget1;
attribute vec3 morphTarget2;
attribute vec3 morphTarget3;
attribute vec3 morphTarget4;
attribute vec3 morphTarget5;
attribute vec3 morphTarget6;
attribute vec3 morphTarget7;
attribute vec3 morphTarget8;
attribute vec3 morphTarget9;

uniform float morph0;
uniform float morph1;
uniform float morph2;
uniform float morph3;
uniform float morph4;
uniform float morph5;
uniform float morph6;
uniform float morph7;
uniform float morph8;
uniform float morph9;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vNormal = normal;
  vUv = uv;

  vec3 meshPos = position;

  if (morph0 > 0.0) { meshPos += morphTarget0 * morph0; }
  if (morph1 > 0.0) { meshPos += morphTarget1 * morph1; }
  if (morph2 > 0.0) { meshPos += morphTarget2 * morph2; }
  if (morph3 > 0.0) { meshPos += morphTarget3 * morph3; }
  if (morph4 > 0.0) { meshPos += morphTarget4 * morph4; }
  if (morph5 > 0.0) { meshPos += morphTarget5 * morph5; }
  if (morph6 > 0.0) { meshPos += morphTarget6 * morph6; }
  if (morph7 > 0.0) { meshPos += morphTarget7 * morph7; }
  if (morph8 > 0.0) { meshPos += morphTarget8 * morph8; }
  if (morph9 > 0.0) { meshPos += morphTarget9 * morph9; }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(meshPos, 1.0);
}
