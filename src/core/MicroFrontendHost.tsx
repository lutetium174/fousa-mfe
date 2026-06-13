import { createEffect, createSignal } from "solid-js";
import type { MicroFrontendDefinition } from "./MicroFrontendTypes.ts";
import { mountMicroFrontend } from "./MicroFrontendLoader.ts";

type MicroFrontendHostProps = {
  mfe: MicroFrontendDefinition;
};

export const MicroFrontendHost = (props: MicroFrontendHostProps) => {
  let containerRef: HTMLDivElement | undefined;
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(true);

  createEffect(async () => {
    if (!containerRef) return;

    setLoading(true);
    setError(null);

    try {
      const unmount = await mountMicroFrontend(
        props.mfe.url,
        containerRef,
        props.mfe.basePath
      );

      createEffect(() => {
        return () => {
          unmount();
        };
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      console.error(`Failed to load MFE ${props.mfe.name}:`, err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="mfe-host">
      {loading() && <div class="mfe-loading">Loading {props.mfe.name}...</div>}
      {error() && (
        <div class="mfe-error">
          <strong>Error loading {props.mfe.name}:</strong>
          <pre>{error()}</pre>
        </div>
      )}
      <div ref={containerRef} class="mfe-container" id="mfe-container" />
    </div>
  );
};
