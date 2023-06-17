import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Snackbar,
} from '@mui/material'
import axios from 'axios'
import { IForm } from '../../common/types'

export const FormСalculator: React.FC = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>()

  const onSubmit: SubmitHandler<IForm> = async (data: IForm) => {
    try {
      const TOKEN = '6204335027:AAGGWX6BUg3XQWFSasG2Z2yg_Wj1rzGW5Mw'
      const CHAT_ID = '-1001752310774'
      const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

      const message = `
        <b>Анкета с сайта</b>\n
        <b>Отправитель: </b> ${data.name}\n
        <b>Email: </b> ${data.email}\n
        <b>Пояснение:</b> ${data.explanation}
        <b>Телефон:</b> ${data.phone}
        <b>Каков профиль деятельности компании?:</b> ${data.q1}
        <b>В каком состоянии у Вас исходные данные для планирования (план продаж, перечень необходимого оборудования, план по персоналу, расходная часть и т.п.)?:</b> ${data.q2}
        <b>Требуется ли расширенная поддержка? (По умолчанию мы осуществляем поддержку всех проектов в течение 2 месяцев.):</b> ${data.q3}
        <b>Дополнительные услуги:</b> ${data.q4}
        <b>Другая информация:</b> ${data.q5}
        
      `

      await axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })

      setIsSnackbarOpen(true)
    } catch (e) {
      console.error(e)
    }
  }
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false)
  }

  return (
    <section>
      <div className="flex flex-col mx-auto my-[15vh] w-3/4 bg-gray-50 p-10 rounded-3xl shadow-xl">
        <form id="tg" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Каков профиль деятельности компании?
              </Typography>
              <FormControl fullWidth>
                <Select
                  {...register('q1', { required: true })}
                  variant="outlined"
                  color="secondary"
                >
                  <MenuItem value="Производство">Производство</MenuItem>
                  <MenuItem value="Торговля">Торговля</MenuItem>
                  <MenuItem value="Выполнение работ / Оказание услуг">
                    Выполнение работ / Оказание услуг
                  </MenuItem>
                  <MenuItem value="Строительство">Строительство</MenuItem>
                  <MenuItem value="Несколько видов деятельности">
                    Несколько видов деятельности
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                В каком состоянии у Вас исходные данные для планирования (план
                продаж, перечень необходимого оборудования, план по персоналу,
                расходная часть и т.п.)?
              </Typography>
              <FormControl fullWidth>
                <Select
                  {...register('q2', { required: true })}
                  variant="outlined"
                  color="secondary"
                >
                  <MenuItem value="На данный момент таких данных нет, ожидаю их от специалистов по бизнес-планированию">
                    На данный момент таких данных нет, ожидаю их от специалистов
                    по бизнес-планированию
                  </MenuItem>
                  <MenuItem value="Есть частичная/разрозненная информация">
                    Есть частичная/разрозненная информация
                  </MenuItem>
                  <MenuItem value="Часть информации собрана и структурирована, часть отсутствует">
                    Часть информации собрана и структурирована, часть
                    отсутствует
                  </MenuItem>
                  <MenuItem value="В основном вся информация есть, нужно только ее объединить и структурировать">
                    В основном вся информация есть, нужно только ее объединить и
                    структурировать
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                Требуется ли расширенная поддержка? (По умолчанию мы
                осуществляем поддержку всех проектов в течение 2 месяцев.)
              </Typography>
              <FormControl fullWidth>
                <Select
                  {...register('q3', { required: true })}
                  variant="outlined"
                  color="secondary"
                >
                  <MenuItem value="Не требуется">Не требуется</MenuItem>
                  <MenuItem value="Требуется в течение 6 месяцев">
                    Требуется в течение 6 месяцев
                  </MenuItem>
                  <MenuItem value="Требуется в течение года">
                    Требуется в течение года
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">Дополнительные услуги:</Typography>
              <FormControl component="fieldset">
                <RadioGroup {...register('q4')} row>
                  <FormControlLabel
                    value="Полиграфический дизайн бизнес-плана"
                    control={<Radio color="secondary" />}
                    label="Полиграфический дизайн бизнес-плана"
                  />
                  <FormControlLabel
                    value="Полиграфический дизайн презентации"
                    control={<Radio color="secondary" />}
                    label="Полиграфический дизайн презентации"
                  />
                  <FormControlLabel
                    value="Сайт проекта (лендинг, визитка)"
                    control={<Radio color="secondary" />}
                    label="Сайт проекта (лендинг, визитка)"
                  />
                  <FormControlLabel
                    value="Продвижение сайта"
                    control={<Radio color="secondary" />}
                    label="Продвижение сайта"
                  />
                  <FormControlLabel
                    value="Маркетинговая стратегия"
                    control={<Radio color="secondary" />}
                    label="Маркетинговая стратегия"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('name', { required: true })}
                label="Имя"
                variant="outlined"
                color="secondary"
                fullWidth
                error={Boolean(errors.name)}
                helperText={
                  errors.name && 'Поле "Имя" обязательно для заполнения'
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('explanation')}
                label="Пояснение"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
                })}
                label="Email"
                variant="outlined"
                color="secondary"
                fullWidth
                error={Boolean(errors.email)}
                helperText={
                  errors.email && 'Поле "Email" обязательно для заполнения'
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('phone', { required: true })}
                label="Телефон"
                variant="outlined"
                color="secondary"
                fullWidth
                error={Boolean(errors.phone)}
                helperText={
                  errors.phone && 'Поле "Телефон" обязательно для заполнения'
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                Как Вы узнали о нас? (укажите источник информации)
              </Typography>
              <TextField
                {...register('q5')}
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Отправить
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Анкета успешно отправлена"
        />
      </div>
    </section>
  )
}
