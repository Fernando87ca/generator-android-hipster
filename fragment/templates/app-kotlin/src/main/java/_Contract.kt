import uk.co.tsb.mobilebank.ui.BaseContract

interface WebViewContract {
    interface View: BaseContract.View {
    }
    interface Presenter: BaseContract.Presenter<View> {
    }
}