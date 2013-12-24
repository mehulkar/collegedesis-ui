var ApplicationAdapter = DS.ActiveModelAdapter.extend({
  host: 'http://localhost:3000',
  namespace: "v1",
});

export default ApplicationAdapter;