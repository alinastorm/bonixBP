/** Отчеты Access
 */

import { App1сУпр } from "../1сProgramm/upr1c.service";

export class SBS {
    constructor(
        private программа1сУпр: App1сУпр
    ) {
        this.программа1сУпр.выгрузитьАвтоматическиДанныеДляСБСКД
    }
    отчетПоСебестоимости() { }
    отчетПоМотивации() { }
}