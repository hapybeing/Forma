export const heroParticleVert = /* glsl */`
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uPixelRatio;
  attribute float aSize;
  attribute vec3  aRandomness;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.x += sin(uTime * 0.4 + aRandomness.x * 6.28318) * 0.12;
    modelPosition.y += cos(uTime * 0.25 + aRandomness.y * 6.28318) * 0.08;
    modelPosition.z += sin(uTime * 0.35 + aRandomness.z * 6.28318) * 0.06;
    vec2 toMouse = uMouse * 3.0 - modelPosition.xy;
    float dist = length(toMouse);
    float pull = smoothstep(2.5, 0.0, dist) * 0.06;
    modelPosition.xy += normalize(toMouse + vec2(0.0001)) * pull;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    gl_PointSize = aSize * uPixelRatio * (180.0 / -viewPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 12.0);
  }
`;
export const heroParticleFrag = /* glsl */`
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, dist);
    alpha = pow(alpha, 1.8);
    vec3 inner = vec3(0.886, 1.0, 0.278);
    vec3 outer = vec3(0.4, 0.65, 0.05);
    vec3 color = mix(outer, inner, smoothstep(0.5, 0.0, dist));
    gl_FragColor = vec4(color, alpha * 0.75);
  }
`;
export const workCardVert = /* glsl */`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
export const workCardFrag = /* glsl */`
  uniform sampler2D uTexture; uniform vec2 uMouse; uniform float uHover; uniform float uTime; varying vec2 vUv;
  void main() {
    vec2 uv = vUv; vec2 toMouse = uv - uMouse; float dist = length(toMouse);
    float ripple = sin(dist * 18.0 - uTime * 4.0) * 0.018; ripple *= uHover; ripple *= smoothstep(0.55, 0.0, dist);
    uv += normalize(toMouse + vec2(0.0001)) * ripple;
    float aberration = uHover * 0.004 * smoothstep(0.55, 0.0, dist);
    float r = texture2D(uTexture, uv + vec2(aberration, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(aberration, 0.0)).b;
    float a = texture2D(uTexture, uv).a;
    gl_FragColor = vec4(r,g,b,a);
  }
`;
