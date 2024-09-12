/** Отчеты Access
 */

import { Upr1C } from "../1сProgramm/upr1c.service";

export class SBS {
    constructor(
        private программа1сУпр: Upr1C
    ) {
        this.программа1сУпр.выгрузитьАвтоматическиДанныеДляСБСКД
    }
    отчетПоСебестоимости() { }
}