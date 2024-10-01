/** Отчеты Access
 */

import { App1сУпр } from "../1сProgramm/upr1c.service";

export class POWERBI {
    constructor(
        private программа1сУпр: App1сУпр
    ) {
        this.программа1сУпр.выгрузитьАвтоматическиДанныеДляСБСКД
    }
    /** TODO РЕАЛИЗОВАТЬ
     * Долги на дату нет возможности просмотра
     * Нет отчета о неактивным клиентам о них вообще нет строки
     */
    отчетПоДолгам() { }
    /** TODO РЕАЛИЗОВАТЬ
     * Долги на дату нет возможности просмотра
     * Нет отчета о неактивным клиентам о них вообще нет строки
     */
    отчетПоНеактивнымКлиентам() { }
    /** Отчёт Call Conversion
     * 1. Отчёт Call Conversion
     * Данный отчёт в виде таблицы позволяет отслеживать эффективность каждого менеджера по следующим показателям:
     * звонки (количество, среднее количество, продолжительность, средняя продолжительность и конверсия),
     * реализации (количество, среднее количество, ВП по отгрузкам в EUR, выручка по отгрузкам в EUR, средний чек реализации.
     * Есть возможность сделать срез по дате и отфильтровать таблицу по заданным менеджерам.
     * Также имеется возможность просмотреть какие товары (и связанные с ними показатели)
     *  были проданы данным менеджером в данный промежуток времени и звонки менеджера.
     * Можно следить за динамикой ВП по выбранному менеджеру и вклад менеджера в ВП компании по круговой диаграмме.
     */
    ОтчётCallConversion() { }

    /** Отчёт Мотивация РОП B2C
     * 2. Отчёт Мотивация РОП B2C
     * В соответствии с Excel файлом мотивации (предоставленный Виталием Кравчуком) рассчитываются месячная,
     * квартальная и годовая выплаты РОП B2C. Отслеживается фактическая ВП по отгрузкам в EUR,
     * плановые показатели ВП, процент выполнения плана; рассчитываются месячная, квартальная,
     * годовая выплаты и флекс без НДС (только в пределах месяца).
     * Выводится также итоговые выплаты для РОП в течение года и выполнение годового плана продаж.
     * Константы для расчёта и правила мотивации приведены в отдельном Excel файле, 
     * который находится в сетевой папке. Есть возможность менять проценты выплат в файле,
     * в результате чего автоматически пересчитаются значения в отчёте.
     */

    ОтчётМотивацияРОПB2C() {

    }
    /** Отчёт Мотивация менеджеры B2C
     *     3. Отчёт Мотивация менеджеры B2C(кроме Воронцовой)
     * Отслеживается фактическая ВП по отгрузкам в EUR, плановые показатели ВП,
     * премии/штрафы, суммы акций; рассчитываются месячная выплата,
     * флекс (BYN и EUR), доплаты и итоговые ЗП.
     * Константы для расчёта и изменяемые каждый месяц параметры приведены в отдельном Excel файле,
     * который находится в сетевой папке.Есть возможность менять параметры в файле,
     * в результате чего автоматически пересчитаются значения в отчёте.
     */
    ОтчётМотивацияМенеджерыB2C() { }

    /** Отчёт Мотивация КомДир
     *  4. Отчёт Мотивация КомДир
     * В соответствии с Excel файлом мотивации(предоставленный Виталием Кравчуком) рассчитываются месячная,
     * квартальная и годовая выплаты КомДир.Отслеживается фактическая ВП по отгрузкам в EUR,
     * плановые показатели ВП, процент выполнения плана; рассчитываются месячная, квартальная,
     *  годовая выплаты и флекс без НДС(только в пределах месяца).Имеется детализация по вкладам отделов B2C, B2B и РФ.
     * Выводится также итоговые выплаты для РОП в течение года и выполнение годового плана продаж.
     * Константы для расчёта и правила мотивации приведены в отдельном Excel файле, который находится в сетевой папке.
     * Есть возможность менять проценты выплат в файле, в результате чего автоматически пересчитаются значения в отчёте.
     */
    ОтчётМотивацияКомДир() { }
}