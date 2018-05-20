// helper method that waits a tick and then forces a component to re-render
// this is required in order for apollo to finish fetching (even for a mocked
// provider). if a component is not wrapped with this method then any Query
// component will still be loading.
export const waitForApollo = async component => {
  await new Promise(resolve => setTimeout(resolve));
  return component.update();
};
