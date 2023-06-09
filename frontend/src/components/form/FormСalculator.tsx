import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material'

interface IForm {
  q1: string
  q2: string
  q3: string
  q4: string
  name: string
  explanation: string
  email: string
  phone: string
  q5: string
}

export const FormСalculator: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>()
  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data)

  return (
    <section>
      <div className="flex flex-col mx-auto my-[15vh] w-3/4 bg-gray-50 p-10 rounded-3xl shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    value="Не нужно"
                    control={<Radio color="secondary" />}
                    label="Не нужно"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('name', { required: true, maxLength: 80 })}
                variant="outlined"
                label="ФИО"
                fullWidth
                error={errors.name ? true : false}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('explanation', { required: true, maxLength: 300 })}
                variant="outlined"
                label="Суть проекта"
                fullWidth
                error={errors.explanation ? true : false}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                variant="outlined"
                label="Email"
                fullWidth
                error={errors.email ? true : false}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('phone', { required: true, maxLength: 12 })}
                variant="outlined"
                label="Ваш телефон"
                fullWidth
                error={errors.phone ? true : false}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('q5')}
                variant="outlined"
                label="Дополнительная информация"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Отправить
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </section>
  )
}
