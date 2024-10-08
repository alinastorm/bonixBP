import { Ecomerce } from './ecomerce.service';

/** Отдел продаж Ecomerce -продажа через почту и месенджеры B2C 
 * Юлия Воронцова ТП торговый представитель
 */

export class YuliaVoroncova extends Ecomerce {

    /** проверка Автоматических Почтовых Заказов */
    проверкаАвтоматическихПочтовыхЗаказовПокупателей() {
        super.проверкаАвтоматическихПочтовыхЗаказовПокупателей()
    }
    /**  настройка Автоматических Почтовых Заказов */
    настройкаАвтоматическихПочтовыхЗаказов() {
        super.настройкаАвтоматическихПочтовыхЗаказов()
    }
    /** оформление- Телефонных Заказов */
    оформлениеТелефонныхЗаказов() {
        super.оформлениеТелефонныхЗаказов()
    }
    /** оформление Заказов Из Месенджеров */
    оформлениеЗаказовИзМесенджеров() {
        super.оформлениеЗаказовИзМесенджеров()
    }
    /** настройка Рассылки Прайс-Листа */
    настройкаРассылкиПрайсЛиста() {
        super.настройкаРассылкиПрайсЛиста()
    }
    /**Приносит списки в ОКс что нужно реализовывать что не нужно
     * Алина окс: днем ездит курьер 
      */
    спискиОкс() { }

    /** В этом файле торг преды оставляют заказ когда им что то нужно. Товар которого нет на остатке и нужно что бы не забыли его включить
     * новый продукт 
     * увеличенная потребность относительно стандартных продаж
      */
    оформитьФайлДляПланаЗакупокExcelПриходыЗаказы() {
        super.оформитьФайлДляПланаЗакупокExcelПриходыЗаказы()
    }

}