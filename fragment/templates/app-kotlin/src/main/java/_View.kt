package <%= appPackage %>.ui.<%= fragmentPackageName %>;

import <%= appPackage %>.ui.BaseContract;

interface <%= fragmentName %>View : PresenterView {
    interface View: BaseContract.View {

    }
    interface Presenter: BaseContract.Presenter<View> {
        fun start()
    }
}
