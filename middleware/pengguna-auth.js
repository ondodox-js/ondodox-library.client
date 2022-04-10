export default function ({ store, redirect }) {
  const user = store.state.user;
  if (user == null || user.akun != "pengguna") {
    return redirect("/u/pengguna");
  }
}
