package com.adp.timeattendance.model;


import com.adp.timeattendance.enums.Department;
import com.adp.timeattendance.enums.JobTitle;

import com.adp.timeattendance.enums.Role;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="Employee_G5_Jan16_20")
public class Employee {
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@ManyToOne
	@JoinColumn(name="ShiftId")
	private TimeShift timeShift;

	@JsonManagedReference
	@OneToMany(mappedBy = "employeeId", cascade = CascadeType.ALL)
	private List<TimeRecord> timeRecords;

	@JsonManagedReference
	@OneToMany(mappedBy = "employeeId",cascade = CascadeType.ALL)
	private List<Attendance> attendances;

	@Column(nullable = false)
	private String name;
	
	@Column
	private String email;
	
	@Column
	private String phone;
	
	@Column(columnDefinition = "VARCHAR(50)")
	@Enumerated(EnumType.STRING)
	private JobTitle jobTitle;

	@Column(columnDefinition = "VARCHAR(50)")
	@Enumerated(EnumType.STRING)
	private Department department;

	@Column(nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}




	public Employee() {
		super();
	}

	public Employee(Integer id, TimeShift timeShift, String name, String email, String phone, JobTitle jobTitle,
			Department department) {
		super();
		this.id = id;
		this.timeShift = timeShift;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.jobTitle = jobTitle;
		this.department = department;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public TimeShift getTimeShift() {
		return timeShift;
	}

	public void setTimeShift(TimeShift timeShift) {
		this.timeShift = timeShift;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public JobTitle getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(JobTitle jobTitle) {
		this.jobTitle = jobTitle;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
	
	
}
