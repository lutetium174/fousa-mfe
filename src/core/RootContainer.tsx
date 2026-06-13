import {createEffect, createSignal, Show} from "solid-js";
import type {MicroFrontendDefinition} from "./MicroFrontendTypes.ts";
import {authMfe, findMicroFrontendByRoute} from "./MicroFrontendRegistry.ts";
import {MicroFrontendHost} from "./MicroFrontendHost.tsx";
import {globalContext} from "./GlobalContext";

type RootContainerProps = {
  initialRoute?: string;
};

export function RootContainer(props: RootContainerProps) {
  const [currentRoute] = createSignal(props.initialRoute);

  const [currentMfe, setCurrentMfe] = createSignal<MicroFrontendDefinition | null>(null);
  const [isAuthenticated, setIsAuthenticated] = createSignal(globalContext.getState().user !== null);

  createEffect(() => globalContext.subscribe((state) => {
    setIsAuthenticated(state.user !== null);
  }));

  createEffect(() => {
    //const route = currentRoute();

    if (true || isAuthenticated()) {
      const mfe = findMicroFrontendByRoute(currentRoute() || "/");
      setCurrentMfe(mfe || null);
      return;
    }

    setCurrentMfe(authMfe);
  });

  return (
    <div class="root-container">
      <button>Help</button>
      <Show when={currentMfe()}>
        {(mfe) => <MicroFrontendHost mfe={mfe()}/>}
      </Show>
      <Show when={!currentMfe() && isAuthenticated()}>
        <div class="no-mfe">
          <p>No module configured for route: {location.pathname}</p>
        </div>
      </Show>
    </div>
  );
};
