import Capacitor
import UIKit

/// Capacitor 7 solo auto-registra los plugins de `packageClassList` (los que
/// vienen de paquetes npm). Los plugins propios de la app hay que darlos de
/// alta a mano aquí, o el puente JS no los encuentra.
class MainViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(LiveActivityPlugin())
    }
}
