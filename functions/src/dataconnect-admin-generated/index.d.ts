import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Allocation_Key {
  id: UUIDString;
  __typename?: 'Allocation_Key';
}

export interface DeleteAllocationData {
  allocation_delete?: Allocation_Key | null;
}

export interface DeleteAllocationVariables {
  id: UUIDString;
}

export interface DeleteExamData {
  exam_delete?: Exam_Key | null;
}

export interface DeleteExamVariables {
  id: UUIDString;
}

export interface DeleteRoomData {
  room_delete?: Room_Key | null;
}

export interface DeleteRoomVariables {
  id: UUIDString;
}

export interface DeleteSeatData {
  seat_delete?: Seat_Key | null;
}

export interface DeleteSeatVariables {
  id: UUIDString;
}

export interface DeleteStudentData {
  student_delete?: Student_Key | null;
}

export interface DeleteStudentVariables {
  id: UUIDString;
}

export interface Exam_Key {
  id: UUIDString;
  __typename?: 'Exam_Key';
}

export interface GetAllocationData {
  allocation?: {
    exam: {
      name: string;
    };
    student: {
      fullName: string;
    };
    seat: {
      seatLabel: string;
    };
  };
}

export interface GetAllocationVariables {
  id: UUIDString;
}

export interface GetExamData {
  exam?: {
    name: string;
    startTime: TimestampString;
    endTime: TimestampString;
    description?: string | null;
  };
}

export interface GetExamVariables {
  id: UUIDString;
}

export interface GetRoomData {
  room?: {
    roomNumber: string;
    totalCapacity: number;
    buildingName?: string | null;
  };
}

export interface GetRoomVariables {
  id: UUIDString;
}

export interface GetSeatData {
  seat?: {
    seatLabel: string;
    room: {
      roomNumber: string;
    };
  };
}

export interface GetSeatVariables {
  id: UUIDString;
}

export interface GetStudentData {
  student?: {
    studentId: string;
    fullName: string;
    email: string;
  };
}

export interface GetStudentVariables {
  id: UUIDString;
}

export interface InsertAllocationData {
  allocation_insert: Allocation_Key;
}

export interface InsertAllocationVariables {
  examId: UUIDString;
  studentId: UUIDString;
  seatId: UUIDString;
}

export interface InsertExamData {
  exam_insert: Exam_Key;
}

export interface InsertExamVariables {
  name: string;
  start: TimestampString;
  end: TimestampString;
}

export interface InsertRoomData {
  room_insert: Room_Key;
}

export interface InsertRoomVariables {
  num: string;
  cap: number;
}

export interface InsertSeatData {
  seat_insert: Seat_Key;
}

export interface InsertSeatVariables {
  label: string;
  roomId: UUIDString;
}

export interface InsertStudentData {
  student_insert: Student_Key;
}

export interface InsertStudentVariables {
  id: string;
  name: string;
  email: string;
}

export interface ListAllocationsData {
  allocations: ({
    exam: {
      name: string;
    };
    student: {
      fullName: string;
    };
    seat: {
      seatLabel: string;
    };
  })[];
}

export interface ListExamsData {
  exams: ({
    name: string;
    startTime: TimestampString;
    endTime: TimestampString;
  })[];
}

export interface ListRoomsData {
  rooms: ({
    roomNumber: string;
    totalCapacity: number;
    buildingName?: string | null;
  })[];
}

export interface ListSeatsData {
  seats: ({
    seatLabel: string;
    room: {
      roomNumber: string;
    };
  })[];
}

export interface ListStudentsData {
  students: ({
    studentId: string;
    fullName: string;
    email: string;
  })[];
}

export interface Room_Key {
  id: UUIDString;
  __typename?: 'Room_Key';
}

export interface Seat_Key {
  id: UUIDString;
  __typename?: 'Seat_Key';
}

export interface Student_Key {
  id: UUIDString;
  __typename?: 'Student_Key';
}

export interface UpdateAllocationData {
  allocation_update?: Allocation_Key | null;
}

export interface UpdateAllocationVariables {
  id: UUIDString;
  seatId: UUIDString;
}

export interface UpdateExamData {
  exam_update?: Exam_Key | null;
}

export interface UpdateExamVariables {
  id: UUIDString;
  name?: string | null;
}

export interface UpdateRoomData {
  room_update?: Room_Key | null;
}

export interface UpdateRoomVariables {
  id: UUIDString;
  cap?: number | null;
}

export interface UpdateSeatData {
  seat_update?: Seat_Key | null;
}

export interface UpdateSeatVariables {
  id: UUIDString;
  label?: string | null;
}

export interface UpdateStudentData {
  student_update?: Student_Key | null;
}

export interface UpdateStudentVariables {
  id: UUIDString;
  name?: string | null;
}

/** Generated Node Admin SDK operation action function for the 'InsertExam' Mutation. Allow users to execute without passing in DataConnect. */
export function insertExam(dc: DataConnect, vars: InsertExamVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertExamData>>;
/** Generated Node Admin SDK operation action function for the 'InsertExam' Mutation. Allow users to pass in custom DataConnect instances. */
export function insertExam(vars: InsertExamVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertExamData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateExam' Mutation. Allow users to execute without passing in DataConnect. */
export function updateExam(dc: DataConnect, vars: UpdateExamVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateExamData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateExam' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateExam(vars: UpdateExamVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateExamData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteExam' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteExam(dc: DataConnect, vars: DeleteExamVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteExamData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteExam' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteExam(vars: DeleteExamVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteExamData>>;

/** Generated Node Admin SDK operation action function for the 'GetExam' Query. Allow users to execute without passing in DataConnect. */
export function getExam(dc: DataConnect, vars: GetExamVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetExamData>>;
/** Generated Node Admin SDK operation action function for the 'GetExam' Query. Allow users to pass in custom DataConnect instances. */
export function getExam(vars: GetExamVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetExamData>>;

/** Generated Node Admin SDK operation action function for the 'ListExams' Query. Allow users to execute without passing in DataConnect. */
export function listExams(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListExamsData>>;
/** Generated Node Admin SDK operation action function for the 'ListExams' Query. Allow users to pass in custom DataConnect instances. */
export function listExams(options?: OperationOptions): Promise<ExecuteOperationResponse<ListExamsData>>;

/** Generated Node Admin SDK operation action function for the 'InsertRoom' Mutation. Allow users to execute without passing in DataConnect. */
export function insertRoom(dc: DataConnect, vars: InsertRoomVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertRoomData>>;
/** Generated Node Admin SDK operation action function for the 'InsertRoom' Mutation. Allow users to pass in custom DataConnect instances. */
export function insertRoom(vars: InsertRoomVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertRoomData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateRoom' Mutation. Allow users to execute without passing in DataConnect. */
export function updateRoom(dc: DataConnect, vars: UpdateRoomVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateRoomData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateRoom' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateRoom(vars: UpdateRoomVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateRoomData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteRoom' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteRoom(dc: DataConnect, vars: DeleteRoomVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteRoomData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteRoom' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteRoom(vars: DeleteRoomVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteRoomData>>;

/** Generated Node Admin SDK operation action function for the 'GetRoom' Query. Allow users to execute without passing in DataConnect. */
export function getRoom(dc: DataConnect, vars: GetRoomVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetRoomData>>;
/** Generated Node Admin SDK operation action function for the 'GetRoom' Query. Allow users to pass in custom DataConnect instances. */
export function getRoom(vars: GetRoomVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetRoomData>>;

/** Generated Node Admin SDK operation action function for the 'ListRooms' Query. Allow users to execute without passing in DataConnect. */
export function listRooms(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListRoomsData>>;
/** Generated Node Admin SDK operation action function for the 'ListRooms' Query. Allow users to pass in custom DataConnect instances. */
export function listRooms(options?: OperationOptions): Promise<ExecuteOperationResponse<ListRoomsData>>;

/** Generated Node Admin SDK operation action function for the 'InsertStudent' Mutation. Allow users to execute without passing in DataConnect. */
export function insertStudent(dc: DataConnect, vars: InsertStudentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertStudentData>>;
/** Generated Node Admin SDK operation action function for the 'InsertStudent' Mutation. Allow users to pass in custom DataConnect instances. */
export function insertStudent(vars: InsertStudentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertStudentData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateStudent' Mutation. Allow users to execute without passing in DataConnect. */
export function updateStudent(dc: DataConnect, vars: UpdateStudentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateStudentData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateStudent' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateStudent(vars: UpdateStudentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateStudentData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteStudent' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteStudent(dc: DataConnect, vars: DeleteStudentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteStudentData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteStudent' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteStudent(vars: DeleteStudentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteStudentData>>;

/** Generated Node Admin SDK operation action function for the 'GetStudent' Query. Allow users to execute without passing in DataConnect. */
export function getStudent(dc: DataConnect, vars: GetStudentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetStudentData>>;
/** Generated Node Admin SDK operation action function for the 'GetStudent' Query. Allow users to pass in custom DataConnect instances. */
export function getStudent(vars: GetStudentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetStudentData>>;

/** Generated Node Admin SDK operation action function for the 'ListStudents' Query. Allow users to execute without passing in DataConnect. */
export function listStudents(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListStudentsData>>;
/** Generated Node Admin SDK operation action function for the 'ListStudents' Query. Allow users to pass in custom DataConnect instances. */
export function listStudents(options?: OperationOptions): Promise<ExecuteOperationResponse<ListStudentsData>>;

/** Generated Node Admin SDK operation action function for the 'InsertSeat' Mutation. Allow users to execute without passing in DataConnect. */
export function insertSeat(dc: DataConnect, vars: InsertSeatVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertSeatData>>;
/** Generated Node Admin SDK operation action function for the 'InsertSeat' Mutation. Allow users to pass in custom DataConnect instances. */
export function insertSeat(vars: InsertSeatVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertSeatData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateSeat' Mutation. Allow users to execute without passing in DataConnect. */
export function updateSeat(dc: DataConnect, vars: UpdateSeatVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateSeatData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateSeat' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateSeat(vars: UpdateSeatVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateSeatData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteSeat' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteSeat(dc: DataConnect, vars: DeleteSeatVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteSeatData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteSeat' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteSeat(vars: DeleteSeatVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteSeatData>>;

/** Generated Node Admin SDK operation action function for the 'GetSeat' Query. Allow users to execute without passing in DataConnect. */
export function getSeat(dc: DataConnect, vars: GetSeatVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetSeatData>>;
/** Generated Node Admin SDK operation action function for the 'GetSeat' Query. Allow users to pass in custom DataConnect instances. */
export function getSeat(vars: GetSeatVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetSeatData>>;

/** Generated Node Admin SDK operation action function for the 'ListSeats' Query. Allow users to execute without passing in DataConnect. */
export function listSeats(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListSeatsData>>;
/** Generated Node Admin SDK operation action function for the 'ListSeats' Query. Allow users to pass in custom DataConnect instances. */
export function listSeats(options?: OperationOptions): Promise<ExecuteOperationResponse<ListSeatsData>>;

/** Generated Node Admin SDK operation action function for the 'InsertAllocation' Mutation. Allow users to execute without passing in DataConnect. */
export function insertAllocation(dc: DataConnect, vars: InsertAllocationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertAllocationData>>;
/** Generated Node Admin SDK operation action function for the 'InsertAllocation' Mutation. Allow users to pass in custom DataConnect instances. */
export function insertAllocation(vars: InsertAllocationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<InsertAllocationData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateAllocation' Mutation. Allow users to execute without passing in DataConnect. */
export function updateAllocation(dc: DataConnect, vars: UpdateAllocationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAllocationData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateAllocation' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateAllocation(vars: UpdateAllocationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateAllocationData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteAllocation' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteAllocation(dc: DataConnect, vars: DeleteAllocationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAllocationData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteAllocation' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteAllocation(vars: DeleteAllocationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteAllocationData>>;

/** Generated Node Admin SDK operation action function for the 'GetAllocation' Query. Allow users to execute without passing in DataConnect. */
export function getAllocation(dc: DataConnect, vars: GetAllocationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAllocationData>>;
/** Generated Node Admin SDK operation action function for the 'GetAllocation' Query. Allow users to pass in custom DataConnect instances. */
export function getAllocation(vars: GetAllocationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAllocationData>>;

/** Generated Node Admin SDK operation action function for the 'ListAllocations' Query. Allow users to execute without passing in DataConnect. */
export function listAllocations(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAllocationsData>>;
/** Generated Node Admin SDK operation action function for the 'ListAllocations' Query. Allow users to pass in custom DataConnect instances. */
export function listAllocations(options?: OperationOptions): Promise<ExecuteOperationResponse<ListAllocationsData>>;

