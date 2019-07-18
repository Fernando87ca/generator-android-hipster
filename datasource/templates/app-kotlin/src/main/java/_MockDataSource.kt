package uk.co.tsb.mobilebank.data.repository.<%= dataFolderName %>.datasource.mock

import uk.co.tsb.mobilebank.data.repository.<%= dataFolderName %>.datasource.<%= dataSourceName %>DataSource
import javax.inject.Inject

class <%= dataSourceName %>MockDataSource @Inject constructor() : <%= dataSourceName %>DataSource {
}