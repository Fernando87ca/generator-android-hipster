package uk.co.tsb.mobilebank.domain.interactor.<%= packageName %>

import io.reactivex.Scheduler
import uk.co.tsb.mobilebank.domain.interactor.<%= useCaseType %>
import uk.co.tsb.mobilebank.ui.di.qualifier.Background
import javax.inject.Inject
<%
if (useCaseType == 'UseCase' || useCaseType == 'UseCaseWithParameter') { %>import io.reactivex.Flowable <% }
if (useCaseType == 'SingleUseCase' || useCaseType == 'SingleUseCaseWithParameter') { %>import io.reactivex.Single <% }
if (useCaseType == 'CompletableUseCase' || useCaseType == 'CompletableUseCaseWithParameter') { %>import io.reactivex.Completable <% }
%>
// android-hipster-needle-component-usecase-imports


class <%= useCaseName %>UseCase @Inject constructor(
        // android-hipster-needle-component-usecase
        @Background private val scheduler: Scheduler
   ) : <%= useCaseType %><%
    if (useCaseType == 'UseCase' || useCaseType == 'SingleUseCase') {
        %></* output value here, string by default */ String><%
    } else if (useCaseType == 'SingleUseCaseWithParameter' || useCaseType == 'UseCaseWithParameter') {
        %></* input parameter here, string by default */ String, /* output parameter here, string by default */ String><%
    } else if (useCaseType == 'CompletableUseCaseWithParameter') {
        %></* input parameter here, string by default */ String><%
    } %> {

    <% if (useCaseType == 'UseCase') {
        %>override fun execute(): Flowable</* output param, String by default */ String> {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        } <%
    } else if (useCaseType == 'UseCaseWithParameter') {
        %>override fun execute(parameter: /* input parameter, String by default */ String): Flowable</* output value, String by default */ String> {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        } <%
    } else if (useCaseType == 'SingleUseCase') {
        %>override fun execute(): Single</* output param, String by default */ String> {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        } <%
    } else if (useCaseType == 'SingleUseCaseWithParameter') {
        %>override fun execute(parameter: /* input parameter, String by default */ String): Single</* output value, String by default */ String> {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        } <%
    } else if (useCaseType == 'CompletableUseCase') {
        %>override fun execute(): Completable {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        } <%
    } else if (useCaseType == 'CompletableUseCaseWithParameter') {
        %>override fun execute(parameter: /* input parameter, String by default */ String): Completable {
            TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
        } <%
    } %>
}

