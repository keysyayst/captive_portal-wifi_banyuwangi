import CountryController from './CountryController'
import AuthController from './AuthController'
import ConfigController from './ConfigController'
import AnnouncementController from './AnnouncementController'
import LocationWeatherController from './LocationWeatherController'
import TickerItemController from './TickerItemController'
import DashboardController from './DashboardController'
import SliderController from './SliderController'
import SettingController from './SettingController'
import PortalContentController from './PortalContentController'
const Controllers = {
    CountryController: Object.assign(CountryController, CountryController),
AuthController: Object.assign(AuthController, AuthController),
ConfigController: Object.assign(ConfigController, ConfigController),
AnnouncementController: Object.assign(AnnouncementController, AnnouncementController),
LocationWeatherController: Object.assign(LocationWeatherController, LocationWeatherController),
TickerItemController: Object.assign(TickerItemController, TickerItemController),
DashboardController: Object.assign(DashboardController, DashboardController),
SliderController: Object.assign(SliderController, SliderController),
SettingController: Object.assign(SettingController, SettingController),
PortalContentController: Object.assign(PortalContentController, PortalContentController),
}

export default Controllers