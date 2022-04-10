export default function ({ store, redirect }) {
  const user = store.state.user;
  if (user == null || user.akun != "admin") {
    return redirect("/u/admin");
  }
}
