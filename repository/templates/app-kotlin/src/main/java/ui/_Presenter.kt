package <%= appPackage %>.ui.<%= activityPackageName %>

import <%= appPackage %>.di.ActivityScope
import <%= appPackage %>.ui.base.BasePresenter

import javax.inject.Inject

@ActivityScope
class <%= activityName %>Presenter @Inject constructor() : BasePresenter<<%= activityName %>View>() {


}
