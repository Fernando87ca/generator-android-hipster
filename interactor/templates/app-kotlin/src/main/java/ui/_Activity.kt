package <%= appPackage %>.ui.<%= activityPackageName %>

import android.os.Bundle;
import <%= appPackage %>.di.ActivityScope
import <%= appPackage %>.di.HasComponent
import <%= appPackage %>.ui.base.BaseActivity
import <%= appPackage %>.R
import <%= appPackage %>.application.App
import <%= appPackage %>.di.components.Dagger<%= activityName %>Component
import <%= appPackage %>.di.components.<%= activityName %>Component
import <%= appPackage %>.di.modules.<%= activityName %>Module

<% if (nucleus == true) { %>import nucleus.factory.PresenterFactory <% } %>

import javax.inject.Inject

@ActivityScope
class <%= activityName %>Activity : BaseActivity<<%= activityName %>Presenter>(), <%= activityName %>View {

        @Inject
        lateinit var <%= activityName.toLowerCase()  %>Presenter: <%= activityName %>Presenter

        lateinit var component: <%= activityName %>Component

        override fun injectModule() {
                component = Dagger<%= activityName %>Component.builder().applicationComponent(App.graph).<%= activityName.toLowerCase()  %>Module(<%= activityName %>Module(this)).build()
                component.inject(this)
        }

        <% if (nucleus == true) { %>override fun getPresenterFactory(): PresenterFactory<<%= activityName %>Presenter>? = PresenterFactory { <%= activityName.toLowerCase()  %>Presenter }<% } %>

        override fun onCreate(savedInstanceState: Bundle?) {
                super.onCreate(savedInstanceState)
        }

        override fun getLayoutResource(): Int {
                return R.layout.activity_<%= activityName.toLowerCase()  %>
        }

}
