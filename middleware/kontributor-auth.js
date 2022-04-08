export default function ({ store, redirect }) {
  const user = store.state.user;
  if (user == null || user.akun != "kontributor") {
    return redirect("/u/kontributor/masuk");
  }
}
