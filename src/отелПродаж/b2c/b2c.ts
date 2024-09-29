import { OKS } from '../../ГруппаОкс/oks.service'
import { ПриходыЗаказыExcel } from "../../_commons/services/excel/приходыЗаказыExcel.service"
import { App1сУпр } from 'src/_commons/services/1сProgramm/upr1c.service'
import { SBS } from 'src/_commons/services/сбс/sbs.service'
import { POWERBI } from 'src/_commons/services/powerBi/powerBi.service'


/**
 * торг преды-холодные звонки или в поля или на телефоне
 * 
 * Павел Максимов Начальник отдела продаж
 * Алексей Балыкин Ведущий ТП
 * Иван Бохонко торговый представитель
 * Павел Дурович Ведущий специалист по продажам
 * Алина Жилинская специалист по тендерной деятельности и правовому анализу
 * Сергей Коплунов Ведущий ТП
 * Антон Корниевич Специалист по продажам
 * Илья Рубец торговый представитель
 * Александр Савко Специалист по продажам
 * Виктор Шоломицкий тех. спец.
 * 
 * Отдел Восток
 * Алексей Змушко Менеджер отдела продаж
 * Вероника Матвейчик Специалист по продажам
 * 
 * Отдел Запад
 * Кирилл Гончерёнок Менеджер отдела продаж
 * Екатерина Разумович Специалист по продажам
 * 
 * Отдел Центр
 * Елизавета Рогачевская Специалист по продажам
 * Денис Таболич Менеджер отдела продаж
 */

export class B2C {

    private приходыЗаказыExcel: ПриходыЗаказыExcel

    constructor(
        private группаОкс: OKS,
        private программа1сУпр: App1сУпр,
        private отчетыСбс: SBS,
        private отчетыPBI: POWERBI,
    ) { }

    /**Уведомление о готовности товара к продаже productIsReadyForSaleNotification */
    получитьУведомлениеОГотовностиТовара() {
        //TODO Что они с этим уведомлением делают?
    }

    /**
     * Окс получают заявку от торгового представителя B2C/b2b
     * создают реализацию по моей просьбе (прошу не должны)
     */
    оформитьЗаявкуРеализицииЧерезСнаб() {
        const заявкаПоЗакрепленномуКонтрагенту = {}
        this.группаОкс.принятьЗаявкуНаОтгрузкуКонтрагентуЧерезСнабИОформитьРеализацию(заявкаПоЗакрепленномуКонтрагенту)
    }
    /**
     * Окс получают заявку от торгового представителя B2C/b2b
     * создают реализацию по моей просьбе (прошу не должны)
     */
    оформитьЗаявкуРеализицииСнабЧерезБоникс() {
        const заявкаПоЗакрепленномуКонтрагенту = {}
        this.группаОкс.принятьЗаявкуНаОтгрузкуКонтрагентуСнабЧерезБониксИОформитьРеализацию(заявкаПоЗакрепленномуКонтрагенту)
    }
    /** В этом файле торг преды оставляют заказ когда им что то нужно. Товар которого нет на остатке и нужно что бы не забыли его включить
     * новый продукт 
     * увеличенная потребность относительно стандартных продаж
      */
    оформитьФайлДляПланаЗакупокExcelПриходыЗаказы() {
        this.приходыЗаказыExcel.создатьExcel()
    }
    /** поиск клиента и заказа клинета торгпредом
     * Торгопред или b2c менеджер ездит ищет клиента
     * И привозит на бумажке заказ коллцентру (девочки соотвествуют менеджерам)
     * Колл центр оформляет заказ согласно информации торг предов
     */
    поискКлиентаИЗаказаКлинетаТоргпредом() { }

    /** поиск клиентов
     * Холодные звонки
     * Могу сбросить презентацию
     * Есть такие бренды купите
     */
    холодныеЗвонки() { }
    /** продажа товара
     * Менеджеры приводят и квалифицируют клиентов
     * консультируют и обсуждают продажу
     * Звонилки оформляют заказ
    */
    продажаТовара() {
        this.программа1сУпр.создатьИПровестиДокументЗаказПокупателя();
    }
    /** повторные продажи
     * обзвон действующих клиентов
     * График развоза
     * Звонилки звонят клиентам нашим из базы какой-то
     * Формируют заказ по направлению
     * Звонят клиентам колцентр и говорит что оформляется направление и оформляют заказа в 1с
     */
    обзвонДействующихКлиентовДляПовторнойПродажи() {
        this.программа1сУпр.создатьИПровестиДокументЗаказПокупателя();
    }
    /**
     * Менеджер высылает реквизиты клиента ОКС
     * Они заполняют
     * Я согласовываю отсрочку основываясь на картотеке лично
     * По умолчанию 7 дней отсрочки
     * ОКС выставляет 26% скидки
     * Я активирую клиента
     */
    заведениеНовогоКлиента() {
        const реквизиты = this.получениеРеквизитовКлиента()
        this.отправкаРеквизитовКлиентаОКС(реквизиты)
        this.согласованиеОтсрочки(реквизиты)

    }
    /** получение Реквизитов Клиента */
    получениеРеквизитовКлиента() {
        return {}
    }
    /** отправка Реквизитов Клиента ОКС */
    отправкаРеквизитовКлиентаОКС(реквизиты) { }
    /** Активация карточки клиента
     * Если клиент новый ему не отгружали он не активирован
     * Начальник b2b b2c  директор или бренд менеджеры активируют клиента
     * Если клиент не активирован то мне блокирует реализацию
     */
    активацияКарточкиКлиента() { }

    /**
     * Я согласовываю отсрочку основываясь на картотеке лично
     * По умолчанию 7 дней отсрочки
     */
    согласованиеОтсрочки(реквизиты) {
        this.получитьДанныеОКлиентеПоРеквизитамИзКартотеки(реквизиты)
    }
    /** активация Клиента
     * Я активирую клиента
     * Заявка на изменение параметров контрагентов
     * Активирую клиента
     * Глубина кредита 0 значит предоплата
     * Контролирую и согласовываю
     * Галочки все ставлю
    */
    активацияКлиента() { }
    /** получить Данные о клиенте по реквизитам Из Картотеки */
    получитьДанныеОКлиентеПоРеквизитамИзКартотеки(реквизиты) { }
    /** Выезд региональной груп к клиентам для генерации заказов
     * Ездят по ип заказывают товар
     */
    выездРегиональнойГруппыККлиентуДляГенерацииЗаказов() {
        this.оформитьДокументПланРаботПоКлиентам()
    }

    /** Оформление документа результата выездак клиенту
     * Ездят по клиентам пишут результат
     */
    оформитьДокументПланРаботПоКлиентам() { }
    /**запуск доставки товара клиенту
     * У лидирующих компаний нет ограничений по сумме. Везут от 30
     * У нас собственные машины везут от 100р заказ клиента а суммарно машина должна собраться не менее 8000р
     * Свиат возит  от 200р
     * Заказы поэтому срываются не развозятся
     * Низкий бюджет не позволяет содержать третьего менеджера
     */
    организацияДоставкиТовараКлиенту() { }

    /** анализ условий предоставленных клиентам */
    анализУсловийПредоставленныхКлиентам() {
        this.программа1сУпр.сформироватьОтчетРентабильностьОстатков()
    }
    /**анализ предоставленых условий клиентам */
    анализПредоставленыхУсловийКлиентам() {
        this.программа1сУпр.сформироватьОтчетОтчетПредоставленныеУсловияКлиентам()
    }

    /** выезды К Клиентам Для Подключения Кабинета Клиента
     * Можно нанять студента что бы ездил и подключал к кабинету клиента
     */
    выездыККлиентамДляПодключенияКабинетаКлиента() { }
    /** обучение сотрудников которые сталкиваются  с клиентом
     * Кто лидер на рынке кто возит какие бренды есть кто в рынке мы по цене
     */
    обучениеCотрудниковКоторыеСталкиваютсяСКлиентом() { }
    /** анализ мотивации
     * Расчет мотивации
     * Внутренний файл
     * 43м
     * Я выдергиваю данные из сбс
     */
    анализМотивации() {
        this.отчетыСбс.отчетПоМотивации()
    }
    /** TODO НЕОБХОДИМО РЕАЛИЗОВАТЬ
     * 38м собеседования по сбс
     * Вчерашний день
     * Долги на дату нет возможности просмотра
     */
    анализДолговКлиентов() {
        this.отчетыPBI.отчетПоДолгам()
    }
    /** TODO НЕОБХОДИМО РЕАЛИЗОВАТЬ
     * 38м собеседования по сбс
     * Вчерашний день
     * Долги на дату нет возможности просмотра
     */
    анализНеактивныхКлиентов() {
        this.отчетыPBI.отчетПоНеактивнымКлиентам()
    }

}