package <%= appPackage %>.ui.<%= packageFolder %>

import uk.co.tsb.mobilebank.ui.BaseContract

interface <%= fragmentName %>Contract {
    interface View: BaseContract.View {

    }

    interface Presenter: BaseContract.Presenter<View> {
        fun start()
    }
}