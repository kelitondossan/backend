import { Request, Response } from 'express'
import { AppDataSource } from '../utills/database'
import { Point } from '../entities/Point'
import { User } from '../entities/User'
import { IsNull, Not } from 'typeorm'

export const startShift = async (req: Request, res: Response) => {
  const pointRepository = AppDataSource.getRepository(Point)
  const userRepository = AppDataSource.getRepository(User)
  const { userId } = req.body

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'userId inválido' })
  }

  try {
    const user = await userRepository.findOneBy({ id: userId })
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    const existingPoint = await pointRepository.findOne({
      where: {
        user: user,
        endTime: IsNull(),
      },
      order: { startTime: 'DESC' },
    })

    if (existingPoint) {
      return res
        .status(400)
        .json({ error: 'Já existe um turno em aberto para este usuário' })
    }

    const newPoint = new Point()
    newPoint.startTime = new Date()
    newPoint.user = user

    await pointRepository.save(newPoint)

    res.status(201).json(newPoint)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      res.status(500).json({ error: error.message })
    } else {
      console.error('Ocorreu um erro desconhecido')
      res.status(500).json({ error: 'Ocorreu um erro desconhecido' })
    }
  }
}

export const endShift = async (req: Request, res: Response) => {
  const pointRepository = AppDataSource.getRepository(Point)
  const userRepository = AppDataSource.getRepository(User)
  const { userId } = req.body

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'userId inválido' })
  }

  try {
    const user = await userRepository.findOneBy({ id: userId })
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    const point = await pointRepository.findOne({
      where: {
        user: user,

      },
      order: { startTime: 'DESC' },
    })

    if (!point) {
      return res
        .status(404)
        .json({ error: 'Turno não encontrado ou já encerrado' })
    }

    point.endTime = new Date()
    await pointRepository.update({ id: point.id }, { endTime: new Date() })

    res.json(point)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      res.status(500).json({ error: error.message })
    } else {
      console.error('Ocorreu um erro desconhecido')
      res.status(500).json({ error: 'Ocorreu um erro desconhecido' })
    }
  }
}

export const startLunch = async (req: Request, res: Response) => {
  const pointRepository = AppDataSource.getRepository(Point)
  const userRepository = AppDataSource.getRepository(User)
  const { userId } = req.body

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'userId inválido' })
  }

  try {
    const user = await userRepository.findOneBy({ id: userId })
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    const point = await pointRepository.findOne({
      where: {
        user: user,
        endTime: IsNull(),
        lunchStartTime: IsNull(),
        lunchEndTime: IsNull(),
      },
      order: { startTime: 'DESC' },
    })

    if (!point) {
      return res
        .status(404)
        .json({ error: 'Turno não encontrado ou já encerrado' })
    }

    point.lunchStartTime = new Date()
    await pointRepository.update(
      {
        id: point.id,
      },
      { lunchStartTime: new Date() },
    )

    res.json(point)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      res.status(500).json({ error: error.message })
    } else {
      console.error('Ocorreu um erro desconhecido')
      res.status(500).json({ error: 'Ocorreu um erro desconhecido' })
    }
  }
}

export const endLunch = async (req: Request, res: Response) => {
  const pointRepository = AppDataSource.getRepository(Point)
  const userRepository = AppDataSource.getRepository(User)
  const { userId } = req.body

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'userId inválido' })
  }

  try {
    const user = await userRepository.findOneBy({ id: userId })
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    const point = await pointRepository.findOne({
      where: {
        user: user,
        endTime: IsNull(),
        lunchStartTime: Not(IsNull()),
        lunchEndTime: IsNull(),
      },
      order: { startTime: 'DESC' },
    })

    if (!point) {
      return res
        .status(404)
        .json({ error: 'Turno não encontrado ou intervalo já encerrado' })
    }

    point.lunchEndTime = new Date()
    await pointRepository.update(
      {
        id: point.id,
      },
      {
        lunchEndTime: new Date(),
      },
    )

    res.json(point)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      res.status(500).json({ error: error.message })
    } else {
      console.error('Ocorreu um erro desconhecido')
      res.status(500).json({ error: 'Ocorreu um erro desconhecido' })
    }
  }
}

export const getShifts = async (req: Request, res: Response) => {
  const pointRepository = AppDataSource.getRepository(Point)
  const userRepository = AppDataSource.getRepository(User)
  const userId = parseInt(req.params.userId)

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'userId inválido' })
  }

  try {
    const user = await userRepository.findOneBy({ id: userId })
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    const shifts = await pointRepository.find({ where: { user: user } })

    res.json(shifts)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      res.status(500).json({ error: error.message })
    } else {
      console.error('Ocorreu um erro desconhecido')
      res.status(500).json({ error: 'Ocorreu um erro desconhecido' })
    }
  }
}
