import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Point {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'timestamp', nullable: true })
    startTime: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    lunchStartTime: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    lunchEndTime: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    endTime: Date | null;

    @ManyToOne(() => User, user => user.id, { nullable: true })
    user: User | null;

    constructor(startTime?: Date | null, lunchStartTime?: Date | null, lunchEndTime?: Date | null, endTime?: Date | null, user?: User | null) {
        this.startTime = startTime || null;
        this.lunchStartTime = lunchStartTime || null;
        this.lunchEndTime = lunchEndTime || null;
        this.endTime = endTime || null;
        this.user = user || null;
    }
}
