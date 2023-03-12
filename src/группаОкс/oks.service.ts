
import { Программа1сУпр } from 'src/_commons/services/1сProgramm/upr.service';
import { ЭлектроннаяПочта } from 'src/_commons/services/email/email.service';
import { Бухгалтерия } from 'src/бухгалтерия/бухгалтерия.service';


/** ГруппаОкс (Отдел выписки)
 * Алина Тузик Руководитель отдела ОКС
 * Ольга Зуева Специалист по работе с клиентами
 * Елена Хомич специалист ОКС
 */

export class ГруппаОкс {

    constructor(
        private бухгалтерия: Бухгалтерия,
        private электроннаяПочта: ЭлектроннаяПочта,
        private программа1сУпр: Программа1сУпр
    ) {
        //  this.runScheduledTasks() 
    }

    /**Прием бумажной накладной
     * когда возвращается накладная девочки ее сканируют
     * видят первый или второй экземпляр
     * у них проставляются галочки что документы вернулись
     * девочки сканируют номер накладной
     * машина видит ТН или ТТН     * 
     */
    оформитьПриемБумажнойНакладной() {
    }
    /** оформитьЗаказПокупателяРосКонтрагента
     * заказ покупателя по российскому клиенту формируется но он формируется от организации боникс автоплюс рб
     * Сразу ОКС сделать заказ покупателя Боникс РФ  клиенту не могут
     * потому что на тот момент когда они создают этот счет заказ 
     * товар числится на боникс авто плюс и мы его на боникс рф еще не отгрузили
     */
    оформитьЗаказПокупателяРосКонтрагента() {
    }
    /** оформить Контрагента
     * по контрагентам РФ данные подают Лене Шевчук или ОКС
     * и они заводят контрагента и прикрепляют договор
     * 
     * При отгрузке на клиента РФ с боникс рф контрагента заводят или лена шевчюк или окс
     * Девчоккам Логисты или бренд менеджеры должны давать договора
     */
    оформитьКонтрагента(договор: any) {
        this.программа1сУпр.созданиеКонтрагента(договор)
    }
    /** Прием Возвратов Excell На Почту
     * Сбрасывают торговикам по почте и они приносят ее на проверку в бухгалтерию
     * Сбрасывают ексель с этой же накладной (формат каждый раз разный)
     */
    приемВозвратовExcellНаПочту() {
        const возврат = this.электроннаяПочта.получитьЭлектронноеПисьмо()
    }
    /**
     * Окс получают заявку от торгового представителя B2C/b2b
     * создают реализацию по моей просьбе (прошу не должны)
    */
    принятьЗаявкуНаОтгрузкуКонтрагентуЧерезСнабИОформитьРеализацию(заявкаПоЗакрепленномуКонтрагенту: any) {
        const документ1cРеализацияТоваров = this.программа1сУпр.оформитьРеализациюТоваров()
        this.бухгалтерия.оформитьРеализациюЧерезСнабИнвест(документ1cРеализацияТоваров)
    }
    /**
     * Может прийти товар на снаб а торговики будут его реализовывать через Боникс авто плюс
     * аналогично предыдущему шагу
     * Окс получают заявку от торгового представителя B2C/b2b
     * создают реализацию по моей просьбе (прошу не должны)
    */
    принятьЗаявкуНаОтгрузкуКонтрагентуСнабЧерезБониксИОформитьРеализацию(заявкаПоЗакрепленномуКонтрагенту: any) {
        const документ1cРеализацияТоваров = this.программа1сУпр.оформитьРеализациюТоваров()
        this.бухгалтерия.оформитьРеализациюСнабЧерезБоникс(документ1cРеализацияТоваров)
    }

    /** отражение операции командировки собственных водителей
     * окс сегодня вечером собирает машину на завтра 
     * создает командировку
     * привязали накладные реализации и розницы
     * машина съездила на следующий день 
     * по окончанию командировки водитель приезжает и привозит развозные листы
     * еще через день его командировку окс дозаполнит по его развозному листу 
     * девочки заполняют показания спидометра
     * время выезда приезда 
     * пробег
     * остатки топлива и сколько водитель заправил
     * эту информацию они заполняют из развозных листов водителя которую он написал
     */
    отразитьОперациюКомандировкаСобственныхПеревозчиков() {
        this.программа1сУпр.создатьИпровестиДокументКомандировка()
    }
  
}
