import { useState } from 'react';
import { Select, Input, DatePicker, Button } from 'antd';
import "./Form.css";

const { Option } = Select;
const { TextArea } = Input;
const initStateForm = {
    towerSelection: null,
    floorSelection: null,
    reservationDateTime: null,
    roomSelection: null,
    commentInput: null,
}

const Form = () => {
    const [form, setForm] = useState(initStateForm);
    const [dataTimeValue, setDataTimeValue] = useState(null);

    const range = (start, end) => {
        if (start > end) {
            return [];
          }
          const result = [];
          for (let i = start; i <= end; i++) {
            result.push(i);
          }
          return result;
    }
    const floorDictonary = range(3, 27);
    const meetingRoomDictonary = range(1, 10);

    const handlerChangeDataTime = (data, dataSring) => {
        setDataTimeValue(data);
        setForm({
            ...form,
            reservationDateTime: dataSring,
        });
    }

    const handlerChangeForm = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setForm({
        ...form,
        [name]: value,
        })
    }

    const handlerChangeSelect = (value, key) => {
        setForm({
            ...form,
            [key]: value,
        });
    }

    const hendlerClickBtnReset = () => {
        setForm(initStateForm);
        setDataTimeValue(null);
    }

    const hendlerClickBtnSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(form));
        hendlerClickBtnReset();
    }

    return(
        <>
            <form className='form'>
                <Select
                    value={form.towerSelection}
                    placeholder="Выберите башню"
                    onChange={(value) => handlerChangeSelect(value, 'towerSelection')}
                >
                    <Option value="Башня А">Башня А</Option>
                    <Option value="Башня Б">Башня Б</Option>
                </Select>

                <Select 
                    value={form.floorSelection}
                    placeholder="Выберете этаж"
                    onChange={(value) => handlerChangeSelect(value, 'floorSelection')}
                >
                    {
                        floorDictonary.map((opt, index) => {
                            return (<Option key={index} value={`${opt} этаж`}>{`${opt} этаж`}</Option>)
                        })
                    }
                </Select>

                <DatePicker
                    showTime
                    format="DD.MM.YYYY HH:mm:ss"
                    placeholder='Выберете время и дату'
                    value={dataTimeValue}
                    onChange={handlerChangeDataTime}
                    className="form__date-picker"
                    showNow={false}
                />

                <Select 
                    value={form.roomSelection}
                    placeholder='Выберете переговорную'
                    onChange={(value) => handlerChangeSelect(value, 'roomSelection')}
                >
                    {
                        meetingRoomDictonary.map((opt, index) => {
                            return (<Option key={index} value={`Переговорная №${opt}`}>{`Переговорная №${opt}`}</Option>)
                        })
                    }
                </Select>

                <TextArea 
                    value={form.commentInput}
                    showCount
                    placeholder='Укажите ваш колмментарий...'
                    maxLength={194}
                    name="commentInput"
                    onChange={handlerChangeForm}             
                />
            </form>
            <div className='form__container-btn'>
                <Button type="primary" onClick={hendlerClickBtnSubmit}>Отправить</Button>
                <Button type="dashed" onClick={hendlerClickBtnReset} danger={true}>Очистить</Button>
            </div>
        </>
    )
}

export default Form;