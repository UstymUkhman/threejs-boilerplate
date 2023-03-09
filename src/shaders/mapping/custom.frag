#define Uncharted2Helper( x ) ( \
  max( \
    ((x * (0.15 * x + 0.1 * 0.5) + 0.2 * 0.02) / \
    (x * (0.15 * x + 0.5) + 0.2 * 0.3)) - 0.02 / 0.3, vec3(0.0) \
  ) \
)

vec3 CustomToneMapping (vec3 color) {
  color *= toneMappingExposure;

  return saturate(
    Uncharted2Helper(color) /
    Uncharted2Helper(vec3(1.0))
  );
}
