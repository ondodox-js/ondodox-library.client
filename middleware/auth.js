export default function ({ redirect, store }) {
  if (store.state.user != null) {
    const user = store.state.user;
    if (user.akun == "kontributor") {
      return redirect("/kontributor");
    } else if (user.akun == "pengguna") {
      return redirect("/pengguna");
    } else {
      return redirect("/admin");
    }
  }
}
