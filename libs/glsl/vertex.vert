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

uniform mat4 bindMatrix;
uniform mat4 bindMatrixInverse;
uniform mat4 boneMatrices[27];

varying vec2 vUv;
varying vec3 vNormal;

mat4 getBoneMatrix( const in float i ) {
  mat4 bone = boneMatrices[ int(i) ];
  return bone;
}

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

  mat4 boneMatX = getBoneMatrix( skinIndex.x );
  mat4 boneMatY = getBoneMatrix( skinIndex.y );
  mat4 boneMatZ = getBoneMatrix( skinIndex.z );
  mat4 boneMatW = getBoneMatrix( skinIndex.w );

  vec4 skinVertex = bindMatrix * vec4(meshPos, 1.0 );
	vec4 skinned = vec4( 0.0 );

	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	meshPos = ( bindMatrixInverse * skinned ).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(meshPos, 1.0);
}
