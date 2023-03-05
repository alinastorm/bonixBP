// import { Injectable } from '@nestjs/common';
import { Программа1сБухБониксАвто } from 'src/_commons/services/1сProgramm/бухBonixAvto.service';
import { Программа1сБухСнаб } from 'src/_commons/services/1сProgramm/бухСнабИнвест.service';
import { Программа1сБухБониксРф } from 'src/_commons/services/1сProgramm/бухБониксРФ.service';
import { Программа1сУпр } from 'src/_commons/services/1сProgramm/upr.service';
import { ЭлектроннаяПочта } from '../_commons/services/email/email.service'
import { КлиентБанк } from '../_commons/services/КлиентБанк/bank1.service'
import { GoogleMapService } from 'src/_commons/services/web/googlemap.service';
import { Владимир } from "../Руководитель/Владимир.service"
import { EventEmitter } from 'stream';


// Определяем интерфейс для данных события
interface EventData {
    message: string;
}

/** Бухгалтерия 
 * Татьяна Клёва Главный бухгалтер
 * Надежда Блажина Бухгалтер
 * Елена Малиновская бухгалтер 2-й категории
 * Елена Сидорович Ведущий бухгалтер
 */

// @Injectable()
export class Бухгалтерия {

    private программа1сУпр: Программа1сУпр
    private программа1сБухБониксАвто: Программа1сБухБониксАвто
    private программа1сБухСнаб: Программа1сБухСнаб
    private программа1сБухБониксРф: Программа1сБухБониксРф
    private ЭлектроннаяПочта: ЭлектроннаяПочта
    private клиентБанк: КлиентБанк
    private googleMapService: GoogleMapService
    private владимир: Владимир

    // emitter = new EventEmitter();

    // /** проверяет почту checkEmail*/
    //  получитьЭлектронноеПисьмоСПакетомДокументов() {
    //     //TODO что там внутри ? Кто что? Какие документы формат
    //     const пакетДокументов = this.ЭлектроннаяПочта.получитьЭлектронноеПисьмо()
    //     this.провестиПроцедуруПроверкиПакетаДокументов(пакетДокументов)
    // }
    // /** Проверить процедуру оценки пакета документов checkDocumentsForImportItems*/
    //  провестиПроцедуруПроверкиПакетаДокументов(пакетДокументов) {
    //     //TODO почему вэд не проверяет? каких документов
    //     const isPackValid = undefined
    //     if (isPackValid) this.проверитьКомплектацию()
    // }
    // /** проверить комплектацию checkPackage*/
    //  проверитьКомплектацию() {
    //     //TODO как проверяет?
    //     const isPackValid = undefined
    //     if (isPackValid) {
    //         this.подготовитьЭкономическоеОбоснование()
    //     }
    // }
    // /** подготовить экономическое обоснование */
    //  подготовитьЭкономическоеОбоснование() {

    // }
    // /** оприходовать товар processReceiptGoods*/
    //  оприходоватьТовар() {

    // }
    /**
     * разнесение выписки из клиент банка в 1с бух
     * выбирается файл из места куда скачали его из интернет банка
     * импортируется только byn валютные проводятся руками
     */
    импортироватьППВиППИДокументыИзКлиентБанкаВБух() {
        const excell = this.клиентБанк.выгрузитьФайлВыпискиБанка('byn')
        this.программа1сБухБониксАвто.импортБанковскойВыпискиByn(excell)
        this.программа1сБухСнаб.импортБанковскойВыпискиByn(excell)
    }
    /** импортировать ППВ из бух в упр 1с
     * документы разделяют между пользователями
     * один вводит ППВ при этом в выписке после импорта удаляет ППИ
     * другой наоборот
     * в обработке нужно проставить договор
    */
    импортироватьДокументыППВИзБухВУпр() {
        const документыБониксАвто = this.программа1сБухБониксАвто.процедураЭкспортаДанныхВыписки('ППВ')
        const документыСнаб = this.программа1сБухСнаб.процедураЭкспортаДанныхВыписки("ППВ")
        this.программа1сУпр.запуститьОбработкуИмпортаВыписки(документыБониксАвто)
        this.программа1сУпр.запуститьОбработкуИмпортаВыписки(документыСнаб)
        this.проверкаРазнесенияВзаиморасчетовПоДоговорамВ1сУпр()
        this.блокировкаКонтрагентов()
    }
    /** импортировать ППИ из бух в упр 1с
     * документы разделяют между пользователями
     * один вводит ППВ при этом в выписке после импорта удаляет ППИ
     * другой наоборот
     * в обработке нужно проставить договор
    */
    импортироватьДокументыППИИзБухВУпр() {
        const документыБониксАвто = this.программа1сБухБониксАвто.процедураЭкспортаДанныхВыписки('ППИ')
        const документыСнаб = this.программа1сБухСнаб.процедураЭкспортаДанныхВыписки("ППИ")
        this.программа1сУпр.запуститьОбработкуИмпортаВыписки(документыБониксАвто)
        this.программа1сУпр.запуститьОбработкуИмпортаВыписки(документыСнаб)
        this.проверкаРазнесенияВзаиморасчетовПоДоговорамВ1сУпр()
        this.блокировкаКонтрагентов()

    }
    /** проверка разнесения взаиморасчетов по договорам и накладным в 1с Упр
     * после импорта выписки обработкой
     * есть контрагенты которые требуют разнесения по накладным
     * что бы правильно отправлялась смс нужно правильно разнести задолженность по накладным
     */
    проверкаРазнесенияВзаиморасчетовПоДоговорамВ1сУпр() {
        this.разнесенияВзаиморасчетовПоДоговорамВ1сУпр()
    }
    /** разнесение взаиморасчетов по договорам и накладным в 1с Упр
     * после импорта выписки обработкой
     * есть контрагенты которые требуют разнесения по накладным
     * что бы правильно отправлялась смс нужно правильно разнести задолженность по накладным
     */
    разнесенияВзаиморасчетовПоДоговорамВ1сУпр() {
        this.программа1сУпр.изменитьДокументБанковскаяВыписка()
    }
    /** контрольВалютныхДоговоров */
    контрольВалютныхДоговоров() {
    }
    /** Закрытие валютных договоров */
    закрытиеВалютныхДоговоров() {
    }
    /** блокировка контрагентов
     * после разнесения выписки создается док блок контр в который попадают контр с просроченной задолженностью автоматич
     * есть блокировка по долгу а есть по статусу
     * у контрагента есть основной менеджер и торговый представитель
     * в накладной стоит срок оплаты отсчитывается отсрочка дн и после 3-х дней после блокируется
     * срок оплаты в накладной рассчитывается из карточки контрагента в реквизите глубина кредита
     * система отсчитывает от даты реализации календарные дни
     */
    блокировкаКонтрагентов() {
        //TODO проверить автоматически ли попадают
        this.программа1сУпр.создатьИПровестиДокументБлокировкаКонтрагентов()
        this.отправкаСмсЗаблокированнымКонтрагентам()
    }
    /** разблокировка контрагентов
     * комментарий из заявки переносится в разблокировку
     */
    разблокировкаКонтрагентов() {
        const заявкиНаРазблокировку = this.программа1сУпр.запуститьОбработкуРазблокировкиКонтрагентовСДЗ()
        this.программа1сУпр.создатьИпровестиДокументРазблокировкаКонтрагентов(заявкиНаРазблокировку)
    }
    /** провести валютные документы ППВ в бух
     * полученные путем просмотра журнала клиентБанка
     */
    отразитьВалютОперациюППВВДок1сБухИзКлиентБанка() {
        //TODO банки разные ?
        const документыППВ = this.клиентБанк.просмотрВалютныхППВ()
        this.программа1сБухСнаб.создатьИПровестиВалютноеПлатежноеПоручениеВходящее(документыППВ)
        this.программа1сБухБониксАвто.создатьИПровестиВалютноеПлатежноеПоручениеВходящее(документыППВ)
    }
    /** провести валютные документы ППИ в бух
     * полученные путем просмотра журнала клиентБанка
     */
    отразитьВалютОперациюППИВДок1сБухИзКлиентБанка() {
        //TODO банки разные тогда у юзеров использующих метод размножить ?
        const документыППИ = this.клиентБанк.просмотрВалютныхППИ()
        this.программа1сБухСнаб.создатьИПровестиВалютноеПлатежноеПоручениеИсходящее(документыППИ)
        this.программа1сБухБониксАвто.создатьИПровестиВалютноеПлатежноеПоручениеВходящее(документыППИ)
    }
    /** отражение операции покупка валюты Снаб
     * создание документа Конвертация валюты
     *при покупке валюты в банке разносится в документ конвертация валюты
     */
    отразитьОперациюКонвертациюВалютыСнаб() {
        const документКонвертацииВалюты = this.клиентБанк.просмотрЗаявокНаПокупкуВалюты()
        this.программа1сБухСнаб.создатьИПровестиКонвертацияВалюты(документКонвертацииВалюты)
    }
    /** отражение операции покупка валюты Боникс
     * создание документа Конвертация валюты
     *при покупке валюты в банке разносится в документ конвертация валюты
     */
    отразитьОперациюКонвертациюВалютыБоникс() {
        const документКонвертацииВалюты = this.клиентБанк.просмотрЗаявокНаПокупкуВалюты()
        this.программа1сБухБониксАвто.создатьИПровестиКонвертацияВалюты(документКонвертацииВалюты)
    }
    /** отражение операции командировки сторонних перевозчиков
     */
    отразитьОперациюКомандировкаСтороннихПеревозчиков() {
        this.googleMapService.расчитатьПротяженностьМаршрута()
        this.программа1сБухБониксАвто.создатьИпровестиДокументАктПолученныхУслуг
        this.программа1сУпр.создатьИпровестиДокументКомандировка()
        this.программа1сУпр.оформитьДокументПоступлениеЗатрат()
    }
    /** отражение операции командировки сторонних собственных водителей
     */
    отразитьОперациюКомандировкаСобственныхПеревозчиков() {
        this.программа1сУпр.создатьИпровестиДокументКомандировка()
    }
    /** отправка смс заблокированным контрагентам */
    отправкаСмсЗаблокированнымКонтрагентам() { }
    /** выставление долга контрагенту
     * 
     * после суда гос пошлина
     * сумма пени
     * проценты
     * основной долг
     */
    выставлениеДолгаКонтрагенту() {
        this.программа1сУпр.создатьИПровестиДокументРаботаСДолгами()
    }
    /** отчет по выставленным долгам контрагентов
     * в отчете долги в работе приход расход остаток по долгам
     */
    анализДолгаКонтрагентов() {
        this.программа1сУпр.сформироватьОтчетДолгиВРаботе()
    }
    /** передача оборудования во временное пользование
     * покупаем стенды
     * и передаем по договору безвозмездного пользования
     * для того что бы торговый отдел знал что у них есть
     */
    передачаОборудованияВоВременноеПользование() {
        this.программа1сУпр.создатьИпровестиДокументДоговорКонтрагентаПоОборудованию()
    }
    /** оформление Заявки На Расходование Денежных Средств
     * акты перевозок
     * оплата налогов
     *  по сроку договора разнести заявки
     * учитывая нашу отсрочку платежа
     */
    оформлениеЗаявокНаРасходованиеДСПоВыставленнымАктам() {
        this.программа1сУпр.создатьИпровестиДокументЗаявкаНаРасходованиеДенежныхСредств()
    }
    /** согласование Заявок НаРасходование ДенежныхСредств
     * прикрепляются копии документов которые идут на оплату
     * если дату не утверждает то дату в заявке переносится на согласованную с владимиром     * 
     */
    согласованиеЗаявокНаРасходованиеДенежныхСредств() {
        const печатнаяФормаВВидеПлатежногоКалендаряСЗаявками = this.программа1сУпр.вывестиИНформациюПоЗаявокНаРасходованиеДенежныхСредств()
        const согласованныеЗаявки = this.владимир.согласоватьПлатежныйКалендарь(печатнаяФормаВВидеПлатежногоКалендаряСЗаявками)
        this.программа1сУпр.изменитьЗаявкуНаРасходованиеДенежныхСредств('новая дата')
        this.оформитьПлатежиВКлиентБанк(согласованныеЗаявки)
    }
    /** оформить платежи в клиент банк
     * после исполнения оплаты по заявке бухгалтер изменяет ее статус с новой на оплачено
     */
    оформитьПлатежиВКлиентБанк(заявки: any) {
        this.клиентБанк.оформитьППИ(заявки)
        this.программа1сУпр.изменитьЗаявкуНаРасходованиеДенежныхСредств('оплачено')
    }
    /** оформить операцию оказанных услуг сторонних контрагентов */
    оформитьОперациюОказанныхУслугСтороннихКонтрагентов() {
        this.программа1сБухБониксАвто.создатьИпровестиДокументАктПолученныхУслуг()
    }

    /** поиск Заказа Поставщику для оформления поступления */
    поискЗаказаПоставщикуДляОформленияПоступления() {
        return this.программа1сУпр.поискЗаказаПоставщику()
    }
    /** оформление поступления товаров
     * Мне передают документы (копии) смотрю по сумме инвойса и спецификации и я знаю какой конкретно заказ
     * На основании заказа поставщику я делаю поступление
     */
    оформитьПоступлениеТоваров(документыКопии: any) {
        this.поискЗаказаПоставщикуДляОформленияПоступления().ввестиНаОсновании()//поступление
        this.экспортДокументовИзУпрВБух(['ПоступлениеТоваров'])
    }
    /** оформлениеДопРасходовПоИмпортуТоваров
     * Сразу есть счет на услуги на основании которого разносятся суммы
     * в бух базе курсы с учетом предоплаты
     * в упр нет поэтому я перебиваю поступления и доп расходы что бы сс сошлась
     * и когда нужно срочно сс приходится лопатить бух базу что бы выяснить
     */
    оформлениеДопРасходовПоИмпортуТоваров(счетНаУслуги: any) {
        this.программа1сУпр.оформлениеДопРасходовПоИмпортуТоваров()
        this.экспортДокументовИзУпрВБух(['ПоступлениеДопРасходов'])
    }
    /** перемещение товара
     * торговые и бренды приходят и говорят что нужно сделать перемещение(пополнить витрину)
     * с основного склада на офис
     * склады розница под номером кассы
     */
    оформитьПеремещениеТовара(списокНаПеремещение: any) {
        this.программа1сУпр.оформитьПеремещениеТоваров()
    }
    /** Списание Товара
     * бывают акции  приносят приказ на акцию
     * подарки клиентам     * 
     * ОКС не хотят накладную поэтому делают заявку на списание через документ списание
     * в конце месяца проводит одним документом в бух базе по всем контрагентом
     * списание на нужды водителей списывает в бух базе на каждого водителя отдельным актом
     */
    оформитьСписаниеТовара(списокНаСписание: any) {
        this.программа1сУпр.оформитьСписаниеТовара()
    }

    /** Экономическое обоснование
     * Экономическое обоснование делается в день когда товар пришел на склад
     * Заполняется по поступлению
     * Заполняются ГруппыРегулирумогоТовара и их процент наценки
     * сверяется эо с бух базой в которой формирую анологичный документ   
     */
    оформитьЭкономическоеОбоснование(поступлениеПоБу: any) {
        this.программа1сУпр.оформитьЭкономическоеОбоснование()
    }
    /** Печать Экономическое обоснование
     * редактируем поля в печатной форме
     * печатаем экономическое обоснование из упр и складываем в папочку
     */
    печатьЭкономическоеОбоснование(эо: any) {
        this.программа1сУпр.оформитьЭкономическоеОбоснование()
    }
    /** оформить Реализацию Товаров
     * Торговые делают заказы
     * Клиентский сервис КС на основании заказов выписывает реализацию  
     */
    оформитьРеализациюТоваров(заказПокупателя: any) {
        this.программа1сУпр.оформитьРеализациюТоваров()
    }
    /** экспортирование Документов Из 1с Упр В Бух HS
     * получение услуг транспорт Елена Анатольевна не пользуется-сразу проводит в бух
     *     РеализациюТоваров
     *     ВозвратПокупателя
     *     ОтчетОРозничныхПродажах
     *     ПоступлениеДопРасх
     *     ПродажаПоКассе
     *     ЗаявлениеОВвозе//не используется
     *     ПолучениеУслугТранспорт
     *     ПередачаМеждуОрганизациями
     *     Комплектация
     *     ВсеДокументы//не существует для удобства ввел
     */
    экспортДокументовИзУпрВБух(docs: any[]) {
        this.программа1сУпр.экспортДокументовИзУпрВБух()
    }
    /** оформить Комплектация Номенклатуры
     * перехожу в комплектующие
     * выбирается карточка нажимаю заполнить и заполняются комплектующие из карточки
     * могу поменять количество
     * заполнить и провести
     */
    оформитьКомплектацияНоменклатуры(заявкаНаКомплект: any) {
        this.программа1сУпр.оформитьКомплектацияНоменклатуры()
    }
    /** оформить розничные продажи после командировки
     * за день ОКС выписывает заявки которые идут чрез интернет по договору 2ф
     * они уходят в розницу
     * и в конце дня девочки формируют командировки 
     * они сформировали командировку в ней видны заявки по 2ке
     * в ней то что увезли водители
     * она нажимает заполнить и в этот журнал попадают готовые накладные
     * 
     * оформить Розничные Продажи c офиса
     * На офисе есть касса может прийти клиент или сотрудник
     * может выписать себе заявку и рассчитаться даже по карте
     * и загружается весь список товара который на складе сертификации
     * заявки остатки на складе сертификации  
     * 
     * оформить Розничные Продажи cо склада
     * и загружается весь список товара который на складе сертификации
     * заявки остатки на складе сертификации
     * 
     * все это оформляется перемещением а потом через подбор табличной части попадает в документ розничной продажи
     */
    оформитьРозничныеПродажи(остаткиНаСкладе: any) {
        this.программа1сУпр.оформитьРозничныеПродажи()
    }
    /**Оформить перемещение на основе заявки и контрольной ленты */
    оформитьПеремещениеНаоСновеЗаявкиИКассовойЛенты(заявка: any, лента: any) {
        this.оформитьПеремещениеТовара(заявка)
    }
    /**Оформить перемещение на основе заявки и контрольной ленты
     * документ используется для оформления документов передачи товара (не самого товара)
     * логисты или брен д менеджеры приносят счета
     * сегодня артем приносит заявку по закрепленному за ним клиенту 
     * кому он отгружал с боникс рф
     * он принес готовые счета в бумажном виде с номенклатурой и ценами
     * и мне нужно в базе сделать передачу между организациями (реализация на экспорт)
     * ставка ндс 0 %
     * вид передачи по ордеру
     */
    оформитьПередачуМеждуОрганизациями() {
        this.программа1сУпр.оформитьПередачуМеждуОрганизациями()
    }
    /** Оформить Ордер На основании Передачи Между Организациями
     * документ предназначен для фиксации факта получения товара
     * вводом на основании передачи между организациями создаю расходный ордер на товары
     * передача автоматически меняет статус на отгружено
     * тогда в отчете видно что товар появился на складе боникс рф 
     */
    оформитьОрдерНаПередачуМеждуОрганизациями() {
        this.программа1сУпр.оформитьРасходныйОрдерНаТовары()
    }
    /** печать Документов Передачи Между Организациями
     * но документы по России печатаются из передачи
     * счет фактура с изменениями 
     * Торг 12
     */
    печатьДокументовПередачиМеждуОрганизациями() {
        this.программа1сУпр.печатьСчетФактураСИзменениями()
        this.программа1сУпр.печатьТорг12()
    }
    /** оформитьРеализациюНаРосКонтрагента
     * девочки или например артем говорит на кого мы выписываем
     * реализацию заполняю руками
     * выбираю склад боникс рф и нужного контрагента
     * товар на боникс рф не хранится на складе сразу отгружается 
     */
    оформитьРеализациюНаРосКонтрагента() {
        this.программа1сУпр.оформитьРеализациюТоваров()
    }
    /** принять Заявку На Экспорт Отгрузку Контрагенту И формить
     * логисты или брен д менеджеры приносят счета
     * сегодня артем приносит заявку по закрепленному за ним клиенту 
     * кому он отгружал с боникс рф
     * он принес готовые счета в бумажном виде с номенклатурой и ценами
     * и мне нужно в базе сделать передачу между организациями (реализация на экспорт)
     * я создаю  документ и заполняю его руками
     */
    принятьЗаявкуНаЭкспортОтгрузкуКонтрагентуИОформить(заявкаПоЗакрепленномуКонтрагенту: any) {
        this.оформитьПередачуМеждуОрганизациями()
        this.печатьДокументовПередачиМеждуОрганизациями()
        this.оформитьОрдерНаПередачуМеждуОрганизациями()
        this.оформитьРеализациюНаРосКонтрагента()
        this.программа1сБухБониксРф.импортироватьДокументы(['поступление', 'реализация'])
    }

    /** оформитьВозвратТоваровОтПокупателя
     */
    оформитьВозвратТоваровОтПокупателя(документ1cВозвратТоваров: any) {
        this.программа1сУпр.оформитьВозвратТоваровОтПокупателя()
    }
    /** оформитьВозвратТоваровОтПокупателя
     * возвраты приносят в бумажном виде на проверку
     * для контроля что клиент правильно написал номенклатуру количество цену количсетво
     * Бывает так что возвращают не наш товар . Цены или количество не правильное
     * Мы договорились что они проводят у себя делают белую накладную (белянки)
     * Сбрасывают торговикам по почте и они приносят ее на проверку
     * Сбрасывают ексель с этой же накладной (формат каждый раз разный)
     * всю номенклатуру набиваем руками
     * проставила количество проставила цены записываю
     * 
     * указываю контрагента и пункт разгрузки
     * так как часто формат ексель меняют . колонки в обработке могут не совпадать
     * поэтому приходится копировать каждую колонку и вставлять выполнить
     * 
     * есть еще распределение
     * обработка проверяет отгрузки контрагенту и заполняет партию товара и документ отгрузки
     * указываю договор адрес и контрагента и нажимаю "распределить по сделкам"
     * после записанного документа вызывается обработка
     * 
     * я записываю документ с пометкой на удаление и даю добро на печать накладной что готовы принять к возврату товар
     * когда приходит накладная в оригинале когда товар принял кладовщик
     * мне передается накладная 
     * вношу номер документа я провожу накладную
     */
    проверитьExcellВозвратТоваровОтПокупателя(заявкаНаВозврат: any) {
        this.программа1сУпр.загрузкаВозвратовИзExcel()
        this.программа1сУпр.оформитьВозвратТоваровОтПокупателя()
        this.программа1сУпр.заполнитьПартииВозвратаТоваровОтПокупателя()
        this.программа1сУпр.пометитьНаУдалениеВозвратТоваровОтПокупателя()
    }
    /** оформить Реализацию Через Снаб Инвест
     * Окс получают заявку от торгового представителя B2C/b2b
     * создают реализацию по моей просьбе (прошу не должны)
     * Есть указания по ценам
     * я вбиваю цену и провожу
     * делаю вводом на основании поступление товаров и услуг
     * при этом меняю контрагента и организацию местами
     * Потом делаю реализацию с организации СнабИнвест
     */
    оформитьРеализациюЧерезСнабИнвест(документ1cРеализацияТоваров: any) {
        this.программа1сУпр.оформитьПоступлениеТоваровИУслуг()
        this.программа1сУпр.оформитьРеализациюТоваров()
        this.экспортДокументовИзУпрВБух(['поступление', 'реализация'])
    }
    /** оформить Реализацию Через Снаб Инвест
     * Может прийти товар на снаб а торговики будут его реализовывать через Боникс авто плюс
     * аналогично предыдущему шагу
     * 
     * Окс получают заявку от торгового представителя B2C/b2b
     * создают реализацию по моей просьбе (прошу не должны)
     * Есть указания по ценам
     * я вбиваю цену и провожу
     * делаю вводом на основании поступление товаров и услуг
     * при этом меняю контрагента и организацию местами
     * Потом делаю реализацию с организации Боникс
     */
    оформитьРеализациюСнабЧерезБоникс(документ1cРеализацияТоваров: any) {
        this.программа1сУпр.оформитьПоступлениеТоваровИУслуг()
        this.программа1сУпр.оформитьРеализациюТоваров()
        this.экспортДокументовИзУпрВБух(['поступление', 'реализация'])
    }
    /** оформитьОтчетПоОтходамПриПоступленииПластикаКартонаИМасла
     * когда подаю отчет за квартал выбираю период без прихода 
     * выгружаю в ексель фильтрую по кодам и подаю в электронный вид на портал
     * при этом приходится минусовать товар который вывезли на россию (на боникс рф реализация) .
     * мы уплачиваем за ввоз масла 3%  нужно за квартал отминусовать и в отчете указать отдельной графой вывезенный товар
     */
    оформитьОтчетПоОтходамПриПоступленииПластикаКартонаИМасла(поступлениеТоваров: any) {
        this.программа1сУпр.оформитьОтчетПоОтходамПриПоступленииПластикаКартонаИМасла()
    }
    /** оформитьЗаявлениеОВвозеТМЦИзТс
     * выгружается с ошибками из за несоответствия бух карточки и упр карточки номенклатуры
     * ошибки в названиях весах брутто нетто
     * приходится когда приходит новый товар карточка создается но она пустая 
     * веса нужны для расчета акциза. из карточки они не вытягивается. поэтому я беру упаковочный лист и вбиваю в рм платильщик руками
     */
    оформитьЗаявлениеОВвозеТМЦИзТс() {
        this.программа1сБухБониксАвто.создатьДокументЗаявлениеОВвозеТоваров()
        this.программа1сБухБониксАвто.выгрузитьЭкспортныеЗаявленияОВозеТМЦ()
    }
}
